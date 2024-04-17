import axios from "axios";
import { createUser, getUser, loginUser } from "../src/api/index";

jest.mock("axios");

describe("Quickly API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("createUser sends a POST request to the correct endpoint", async () => {
    const userInfo = {
      first_name: "First",
      last_name: "Last",
      email: "first@last.com",
      password: "1234567",
    };
    const companyInfo = {
      activity: {
        early_pay_intent: true,
        expected_activity: "Get my invoices paid early",
      },
      early_pay_intent: true,
      industry: {
        value: "Apps",
        label: "Apps",
      },
      business_type: {
        label: "Digital products",
        value: "Digital products",
      },
      website: "",
      business_registration: "corporation",
      phone: "4035550987",
      business_number: "654987321",
      has_trade_name: false,
      legal_name: "Sample Company",
      expected_activity: "Get my invoices paid early",
    };
    const mockResponseData = {
      success: true,
      message: "Signup Succesful!",
      token: "mockToken",
      user: userInfo
    };
    axios.post.mockResolvedValueOnce({ data: mockResponseData });

    const response = await createUser(userInfo, companyInfo);

    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.REACT_APP_QUICKLY_BASE_URL}/auth/signup`,
      { user: userInfo, company: companyInfo }
    );
    expect(response).toEqual(mockResponseData);
  });

  test("getUser sends a GET request to the correct endpoint with Authorization header", async () => {
    const token = "mockToken";
    const mockResponseData = {
      full_name: "First Last",
      id: 497,
      first_name: "First",
      last_name: "Last",
      email: "first@last.com",
      company_id: 485,
      phone: null,
      avatar_url: null,
      CompanyId: 485,
      Company: {
        name: "Sample Company",
        legal_name: "Sample Company",
        business_registration: "corporation",
        business_type: "Digital products",
        industry: "Apps",
        expected_activity: "Get my invoices paid early",
        early_pay_intent: 1,
        website: "",
        business_number: "654987321",
        primary_email: "first@last.com",
        phone: "4035550987",
        address_line_1: null,
      },
    };
    axios.get.mockResolvedValueOnce({
      data: { success: true, user: mockResponseData },
    });

    const response = await getUser(token);

    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.REACT_APP_QUICKLY_BASE_URL}/auth/user`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    expect(response).toEqual(mockResponseData);
  });

  test("loginUser sends a POST request to the correct endpoint", async () => {
    const email = "test@user.com";
    const password = "password";
    const mockResponseData = {
      success: true,
      token: "mockToken",
    };
    axios.post.mockResolvedValueOnce({ data: mockResponseData });

    const response = await loginUser(email, password);

    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.REACT_APP_QUICKLY_BASE_URL}/auth/login`,
      { email, password }
    );
    expect(response).toEqual(mockResponseData);
  });
});
