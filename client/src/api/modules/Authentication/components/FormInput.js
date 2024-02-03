import React from 'react';

const styles = {
  container: {
    maxWidth: '350px',
    margin: '50px auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  input: {
    width: '100%',
    padding: '10px 15px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ddd'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold'
  },
  button: {
    width: '100%',
    padding: '10px 15px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px'
  }
};


const FormInput = ({ type, id, name, value, placeholder, onChange }) => (
  <div>
    <label htmlFor={id} style={styles.label}>{placeholder}:</label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={`Enter your ${placeholder.toLowerCase()}`}
      style={styles.input}
      required
    />
  </div>
);

export default FormInput;
