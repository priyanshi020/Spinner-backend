const validateBeneficiary = (data) => {
    const { beneId, name, email, phone, vpa } = data;
    if (!beneId || !name || !vpa) {
      throw new Error('Beneficiary ID, Name, and UPI ID (VPA) are required.');
    }
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      throw new Error('Invalid email format.');
    }
    if (phone && !/^\d{10}$/.test(phone)) {
      throw new Error('Phone number must be 10 digits.');
    }
  };
  
  module.exports = { validateBeneficiary };
  