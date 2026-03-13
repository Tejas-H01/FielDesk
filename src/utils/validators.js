export const validateLogin = ({ email, password }) => {
  const errors = {};

  if (!email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!password.trim()) {
    errors.password = "Password is required.";
  }

  return errors;
};

export const validateDpr = (form) => {
  const errors = {};

  if (!form.date) {
    errors.date = "Select a report date.";
  }

  if (!form.weather) {
    errors.weather = "Select the weather.";
  }

  if (!form.description.trim()) {
    errors.description = "Work description is required.";
  } else if (form.description.trim().length < 12) {
    errors.description = "Add a little more detail (min 12 characters).";
  }

  if (!form.workers) {
    errors.workers = "Worker count is required.";
  } else if (Number(form.workers) < 1) {
    errors.workers = "Worker count must be at least 1.";
  }

  if (form.photos.length === 0) {
    errors.photos = "Upload at least one site photo.";
  }

  return errors;
};
