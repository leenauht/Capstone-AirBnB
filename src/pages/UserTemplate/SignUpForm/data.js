export const data = [
  {
    label: "Username",
    name: "username",
    group: "",
    rules: [
      {
        required: true,
        message: "Please input your username!",
      },
    ],
  },
  {
    label: "Email",
    name: "email",
    group: "",
    rules: [
      {
        required: true,
        message: "Please input your email!",
      },
    ],
  },
  {
    label: "Password",
    name: "password",
    group: "",
    rules: [
      {
        required: true,
        message: "Please input your password!",
      },
    ],
  },
  {
    label: "Phone",
    name: "password",
    group: "",
    rules: [
      {
        required: true,
        message: "Please input your phone!",
      },
    ],
  },
  {
    label: "Gender",
    name: "radio",
    group: [
      { value: "nam", title: "Nam" },
      { value: "nu", title: "Nữ" },
    ],
    rules: [
      {
        required: true,
        message: "Please select your gender!",
      },
    ],
  },
  {
    label: "DatePicker",
    name: "datePicker",
    group: "",
    rules: [
      {
        required: true,
        message: "Please input your datePicker!",
      },
    ],
  },
];
