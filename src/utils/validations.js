import * as Yup from 'yup';

export const employeeValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters'),
  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  department: Yup.string()
    .required('Department is required'),
  position: Yup.string()
    .required('Position is required'),
  joinDate: Yup.date()
    .required('Join date is required')
    .max(new Date(), 'Join date cannot be in the future')
});

export const leaveValidationSchema = Yup.object().shape({
  leaveType: Yup.string()
    .required('Leave type is required'),
  dateRange: Yup.array()
    .required('Date range is required')
    .min(2, 'Please select start and end dates'),
  reason: Yup.string()
    .required('Reason is required')
    .min(10, 'Reason must be at least 10 characters'),
  contactDetails: Yup.string()
    .required('Contact details are required')
});

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
});