import { Admin } from "@/components/Admin/admin"
import { allConsultations } from "@/utils/api";
import { currentUser } from "@clerk/nextjs/server";

const AdminPage = async () => {
  const user = await currentUser();
  // console.log(user);
  
  const consultations = await allConsultations();
  
  return (
    <Admin consultations={consultations} />
  )
}

export default AdminPage
