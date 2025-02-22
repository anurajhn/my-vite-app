// src/pages/Contact.jsx
import React, { useState } from 'react';

function Contact() {
  console.log('Rendering Contact Component'); // Debugging log

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Simple validation
  //   if (!formData.name || !formData.mobile || !formData.email || !formData.message) {
  //     alert('Please fill in all fields.');
  //     return;
  //   }

  //   try {
  //     const response = await fetch('http://localhost:5000/api/send-email', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (response.ok) {
  //       alert('Message sent successfully!');
  //       setFormData({ name: '', mobile: '', email: '', message: '' });
  //     } else {
  //       alert('Failed to send message. Please try again later.');
  //     }
  //   } catch (error) {
  //     console.error('Error sending email:', error);
  //     alert('An error occurred while sending the message.');
  //   }
  // };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h3>Contact Us</h3>
      <p>Email: anuinvesst@gmail.com</p> 
      {/* <p>Phone: +123-456-7890</p>*/}

  {/*    <form onSubmit={handleSubmit} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <input
          type="tel"
          name="mobile"
          placeholder="Your Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          required
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
          style={{ padding: '10px', fontSize: '16px', resize: 'none' }}
        ></textarea>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px',
          }}
        >
          Submit
        </button>
      </form>*/}
    </div>
  );
}

export default Contact;