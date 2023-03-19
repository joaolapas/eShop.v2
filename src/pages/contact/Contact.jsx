
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContactSass from "./Contact.module.sass"

const Contact = () => {
  const form = useRef();

  //emailjs
  const sendEmail = (e) => {
    e.preventDefault();
    const sent = (message) => {
      toast.success('Your message was sent!', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    };
    const notSent = (message) => {
      toast.error('Not sent! - ' + message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    };
    emailjs
      .sendForm(
        "service_6grktup",
        "template_snakpup",
        form.current,
        "dGSRbEuUE8Q6iFm8b"
      )
      .then(
        (result) => {
          console.log(result.text);
          sent(result.text);
        },
        (error) => {
          console.log(error.text);
          notSent(error.text);
        }
      );
  };
  return (
    

      <div className={ContactSass.container}>
        <h1>Contact Us</h1>
        <form ref={form} onSubmit={sendEmail}>
          <label>Your Name</label>
          <input type="text" name="user_name" required />
          <label>How can we help you?</label>
          <textarea name="message" placeholder="message" required />
          <label>Your email</label>
          <input type="email" name="user_email" required />
          <button type="submit" value="Send">
            Send
          </button>
        </form>
      </div>
     
  );
};

export default Contact;
