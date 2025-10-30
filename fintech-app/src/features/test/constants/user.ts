export const userMock: User = {
  id: "USR-001",
  firstName: "Juan",
  lastName: "Pérez",
  email: "juan.perez@gmail.com",
  role: "PYME",
  createdAt: "2025-10-29T10:00:00Z",
  pymeData: {
    companyName: "Gastromy SRL",
    address: "Av. Corrientes 3265, Local 8, Balvanera, Ciudad de Buenos Aires",
    employees: 18,
    phone: "+54 11 2345-6789",
    hasKycValidated: true,
    sector: "Comercial"
  },
};

export const userOpMock: User = {
  id: "USR-001",
  firstName: "Marcos",
  lastName: "Pintos",
  email: "marcp@gmail.com",
  role: "OPERATOR",
  createdAt: "2025-10-29T10:00:00Z",
  pymeData: {
    companyName: "Gastromy SRL",
    address: "Av. Corrientes 3265, Local 8, Balvanera, Ciudad de Buenos Aires",
    employees: 18,
    phone: "+54 11 2345-6789",
    hasKycValidated: true,
    sector: ""
  },
};