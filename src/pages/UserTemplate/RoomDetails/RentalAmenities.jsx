export default function RentalAmenities({ data }) {
  const result = [];
  const length = Object.keys(data).length;

  Object.entries(data).forEach(([key, value], index) => {
    result.push(
      <span key={index}>
        {value}
        {index < length - 1 ? ", " : ""}
      </span>
    );
  });
  return result;
}
