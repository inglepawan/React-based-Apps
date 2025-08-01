export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const calculateAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

export const formatCurrency = (amount, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2
  }).format(amount);
};

export const getInitials = (name) => {
  return name.split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

export const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'active':
    case 'completed':
    case 'approved':
    case 'paid':
      return 'green';
    case 'pending':
    case 'in progress':
      return 'orange';
    case 'rejected':
    case 'cancelled':
    case 'absent':
      return 'red';
    default:
      return 'blue';
  }
};