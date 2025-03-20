export default function RentalAmenities({ name, support }) {
  Object.entries(support).forEach(([key, value]) => {
    if (support[value] === name) {
      return (result += <s>{name}</s>);
    } else {
      return (result += <span>{name}</span>);
    }
  });
  return result;
}
