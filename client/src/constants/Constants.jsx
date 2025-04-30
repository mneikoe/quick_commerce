const Constants = {
  USER_ROLE: {
    DELIVERYBOY: "deliveryboy",
    SHOPKEEPER: "shopkeeper",
    USER: "user",
    ADMIN: "admin",
  },
  ORDER_STATUS: {
    PENDING: "pending",
    CONFIRMED: "confirmed", //admiin
    ASSIGNED: "assigned", //admin
    READY: "ready", //shopkeerp
    PICKEDUP: "pickedup", //deliveryboy
    DELIVERED: "delivered", //deliveryboy
  },
  STATUS: {
    ACTIVE: "active",
    INACTIVE: "inactive",
  },
};

export default Constants;
