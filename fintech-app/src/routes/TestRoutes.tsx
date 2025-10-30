import { Routes, Route } from "react-router-dom";
import TestLayout from "@/layouts/TestLayout";
import { RequestDetails } from "@/features/test/components/RequestDetails";
import { ApprovedOverview } from "@/features/test/components/ApprovedOverview";
import { PendingOverview } from "@/features/test/components/PendingOverview";
import { RequestOpDetails } from "@/features/test/components/RequestOpDetails";
import { ApprovedRequest } from "@/features/test/components/ApprovedRequest";
import { OpOverview } from "@/features/test/components/OpOverview";
import { OpTable } from "@/features/test/components/OpTable";
import { OpMetrics } from "@/features/test/components/OpMetrics";



export const TestRoutes = () => {

  return (
    <Routes>
      <Route element={<TestLayout />}>

        {/* Vista overview con card de seguimiento de la solicitud */}
        <Route path="pendoverview" element={<PendingOverview />} />
        {/* Vista RequestDetails de la pyme sin botones */}
        <Route path="req" element={<RequestDetails />} />
        
        <Route path="opover" element={<OpOverview />} />
        <Route path="optable" element={<OpTable />} />
        <Route path="opmetrics" element={<OpMetrics />} />
        {/* Vista de operador RequestDetails con botones */}
        <Route path="opreq" element={<RequestOpDetails />} />
        {/* Vista overview con card aprobada */}
        <Route path="apoverview" element={<ApprovedOverview />} />
        {/* Vista RequestDetails aprobada y con informacion sobre los siguientes pasos */}
        <Route path="apreq" element={<ApprovedRequest />} />
      </Route>
    </Routes>
  );
}
