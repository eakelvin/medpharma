import axios from "axios";

export const allConsultations = async () => {
    try {
    //   const { data } = await axios.get(`${process.env.BASE_URL}/consultation/all`);
      const { data } = await axios.get("http://localhost:4000/api/consultation/all");
      return data;
    } catch (error) {
      console.log(error);
    }
  };