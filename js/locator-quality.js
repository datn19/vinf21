// Cùng một quy tắc cho thẻ kết quả, popup và liên kết chỉ đường.
export function hasCoordinates(item) {
  return (
    Number.isFinite(item.lat) &&
    Number.isFinite(item.lng) &&
    Math.abs(item.lat) <= 90 &&
    Math.abs(item.lng) <= 180 &&
    item.coordinateStatus !== 'CONFLICT'
  );
}

export function addressText(item) {
  if (item.addressConfidence === 'VERIFIED_OFFICIAL') {
    return `Địa chỉ theo nguồn chính thức: ${item.verifiedAddress}`;
  }
  if (item.addressConfidence === 'APPROXIMATE_GEOCODED') {
    return `Địa chỉ gần vị trí ghim (tham khảo): ${item.approximateAddress}`;
  }
  if (item.addressConfidence === 'UNVERIFIED' && item.reportedAddress) {
    return `Địa chỉ nguồn công bố, chưa xác minh đầy đủ: ${item.reportedAddress}`;
  }
  return 'Chưa có địa chỉ đường được xác minh.';
}

export function directions(item) {
  const destination = hasCoordinates(item)
    ? `${item.lat},${item.lng}`
    : item.verifiedAddress ||
      (item.directionsAddressStatus === 'SOURCE_CONFIRMED'
        ? item.directionsAddress
        : null);
  return destination
    ? 'https://www.google.com/maps/dir/?api=1&destination=' +
        encodeURIComponent(destination)
    : null;
}

export function searchText(item) {
  return [
    item.name,
    item.address,
    item.verifiedAddress,
    item.reportedAddress,
    item.approximateAddress,
    item.ward,
    item.province,
  ]
    .filter(Boolean)
    .join(' ');
}
