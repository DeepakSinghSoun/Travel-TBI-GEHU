export const filterProperties = (properties, searchData) => {
  return properties.filter((property) => {
    // Destination
    const matchesDestination =
      searchData.destination === "" ||
      property.title
        .toLowerCase()
        .includes(searchData.destination.toLowerCase()) ||
      property.location
        .toLowerCase()
        .includes(searchData.destination.toLowerCase());

    // Price
    const matchesPrice =
      searchData.price === "" ||
      property.price <= Number(searchData.price);

    // Room Type
    const matchesRoom =
      searchData.roomType === "" ||
      property.roomType === searchData.roomType;

    // Available Rooms
    const hasRooms = property.availableRooms > 0;

    // Date Availability
    const matchesDate =
      (!searchData.checkIn ||
        searchData.checkIn >= property.availableFrom) &&
      (!searchData.checkOut ||
        searchData.checkOut <= property.availableTo);

    return (
      matchesDestination &&
      matchesPrice &&
      matchesRoom &&
      hasRooms &&
      matchesDate
    );
  });
};