import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import PharmacySection from "../components/PharmacySection";

function Pharmacies() {
  return (
    <div className="bg-[#f6f8fc] min-h-screen flex">
      <Sidebar />

      <div className="flex-1 p-6">
        <Topbar />

        <div className="max-w-7xl mx-auto">
          <PharmacySection />
        </div>
      </div>
    </div>
  );
}

export default Pharmacies;