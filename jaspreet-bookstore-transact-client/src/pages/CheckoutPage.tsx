import "./CheckoutPage.css";

import { isCreditCard, isMobilePhone } from '../validators';
import { months, sleep, years } from '../utils';

import { object, string, number, ValidationError } from "yup";
import { Form, Formik, FormikHelpers } from "formik";
import { SelectInput } from "../components/form/SelectInput"
import { TextInput } from "../components/form/TextInput"
import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import {useCart} from "../contexts/CartContext.tsx";
import {useCategoryContext} from "../contexts/CategoryContext.tsx";
import {OrderDetails, ServerErrorResponse} from "../types.ts";
import {placeOrder} from "../services.ts";
import {useOrderDetails} from "../contexts/OrderDetailsContext.tsx";

// Create an interface named FormValues to represent the form values.
interface FormValues {
  name: string;
  address: string;
  phone: string;
  email: string;
  ccNumber: string;
  ccExpiryMonth: number;
  ccExpiryYear: number;
}

// Create a constant named initialValues of type FormValues and set it to an object with the following properties:
const initialValues: FormValues = {
  name: '',
  address: '',
  phone: '',
  email: '',
  ccNumber: '4444333322221111',
  ccExpiryMonth: new Date().getMonth() + 1,
  ccExpiryYear: new Date().getFullYear(),
};

// Define yearsArray as an array of years so it is evaluated only once.
const yearsArray = years();

// Create a constant named validationSchema of type object and define the schema for the form values using the yup library.
const validationSchema = object({

  name: string()
        .required('Please provide a name.')
        .min(4, 'Name must have at least 4 letters.')
        .max(45, 'Name can have at most 45 letters'),

  address: string()
        .required('Please provide an address.')
        .min(4, 'Address must have at least 4 letters.')
        .max(45, 'Address can have at most 45 letters'),

  phone: string()
      .required('Please provide a phone number.')
      .test('isMobilePhone', 'Please provide a valid phone number.', value => isMobilePhone(value || '')),

  email: string()
      .required('Please provide an email address.')
      .email('Please provide a valid email address.'),

  ccNumber: string().required('Please provide a credit card number.')
      .test('isCreditCard', 'Please provide a valid credit card number.', value => isCreditCard(value || '')),

  ccExpiryMonth: number(),

  ccExpiryYear: number(),

});


{/* Adding more validations for these and other fields that need more validation. */}

export default function CheckoutPage() {
  const { cart, dispatch: cartStore } = useCart();
  const { dispatch: orderDetailsStore } = useOrderDetails();

  const navigate = useNavigate();

  const cartItems = cart.items;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.book.price / 100) * item.quantity, 0).toFixed(2);

  const surcharge = 5.00; // Example surcharge amount
  const totalAmount = parseFloat(subtotal) + surcharge;

  // Track the checkout status using a state variable.
  const [checkoutStatus, setCheckoutStatus] = useState<string>("");
  const [serverErrorMessage, setServerErrorMessage] = useState<string>(
    "An unexpected error occurred on the server, please try again."
  );


  const handleSubmit = async (values: FormValues, actions: FormikHelpers<FormValues>) => {

    console.log("Submit order");
    await sleep(1000);
    const result = await validationSchema.validate(values, { abortEarly: false }).catch((err) => err);
    if (result instanceof ValidationError) {
        setCheckoutStatus('ERROR');
        actions.setSubmitting(false);
    } else {
      setCheckoutStatus('PENDING');

      const placeOrderResponse: OrderDetails | ServerErrorResponse =
        await placeOrder(cart, {
            name: values.name,
            address: values.address,
            phone: values.phone,
            email: values.email,
            ccNumber: values.ccNumber,
            ccExpiryMonth: values.ccExpiryMonth,
            ccExpiryYear: values.ccExpiryYear,
        });
      if ("error" in placeOrderResponse) {
            setCheckoutStatus("SERVER_ERROR");
            setServerErrorMessage(placeOrderResponse.message);
            console.log("Error placing order", placeOrderResponse);
      } else {

          orderDetailsStore({ type: "CLEAR" });
          const orderDetails = placeOrderResponse as OrderDetails;
          console.log("Order Detailss: ", placeOrderResponse);

          orderDetailsStore({ type: "UPDATE", orderDetails: orderDetails });
          cartStore({ type: "CLEAR_CART" });

          setCheckoutStatus("OK");
          navigate("/confirmation");
      }

    }
};

  const { lastSelectedCategoryName } = useCategoryContext();

  return (
      <div className="checkout-page">
        <h1>Checkout</h1>
        {cart.empty && (
            <div className="empty-cart-message">
              <p>Your cart is empty.</p>
              <Link className="continue-shopping" to={`/category/${lastSelectedCategoryName}`}>
                <button>
                  Continue Shopping
                </button>
              </Link>
            </div>
        )}

        {!cart.empty && (
            <section className="checkout-page-body">
              <section className="checkout-page-form-and-details">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    validateOnChange={false}
                    validateOnBlur={true}
                >
                  {({isSubmitting, isValid}) => (
                      <Form>

                        <TextInput label="Name" name="name"/>

                        <TextInput label="Address" name="address"/>

                        <TextInput label="Phone" name="phone"/>

                        <TextInput label="Email" name="email"/>

                        <TextInput label="Credit Card" name="ccNumber"/>

                        <div>
                          <label htmlFor="ccExpiryMonth">Exp Date:</label>
                          <SelectInput name="ccExpiryMonth" options={months()} inline label=""/>
                          <SelectInput name="ccExpiryYear" options={yearsArray} inline label=""/>
                        </div>


                        <button type="submit"
                                disabled={isSubmitting || checkoutStatus === 'PENDING' || !isValid}>
                          {isSubmitting ? <FontAwesomeIcon icon={faSpinner} spin/> : 'Submit'}
                        </button>

                        <hr style={{margin: '15px 0'}}/>
                        <div className="checkout-total-message">
                          Your credit card will be charged ${totalAmount} <br/>
                          (${subtotal} + ${surcharge} shipping)
                        </div>

                      </Form>
                  )}
                </Formik>

              </section>


              {checkoutStatus != '' && (
                  <section className="checkoutStatusBox">
                    {checkoutStatus === "SERVER_ERROR" && serverErrorMessage}
                    {checkoutStatus === 'ERROR' && <div>Error: Please fix the problems above and try again.</div>}
                    {checkoutStatus === 'PENDING' && <div>Processing...</div>}
                    {checkoutStatus === 'OK' && <div>Order placed...</div>}
                  </section>
              )}
            </section>
        )}
      </div>
  );
}

