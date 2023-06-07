import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AdminForm from "./scenes/adminform";
import Bar from "./scenes/bar";
import Businesses from "./scenes/busensses";
import BusinessProfile from "./scenes/businessProfile";
import BusinessForm from "./scenes/businessform";
import BusinessTax from "./scenes/businesstax";
import Calendar from "./scenes/calendar/calendar";
import CitizenProfile from "./scenes/citizenProfile";
import Citizens from "./scenes/citizens";
import CitizenTax from "./scenes/citizentax";
import Dashboard from "./scenes/dashboard";
import DueTax from "./scenes/duetax";
import FAQ from "./scenes/faq";
import Form from "./scenes/form";
import Geography from "./scenes/geography";
import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
import Invoices from "./scenes/invoices";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import Prottoyon from "./scenes/prottoyon";
import CommonCertificate from "./scenes/sonod/CommonCertificate";
import Team from "./scenes/team";
import SingleLicense from "./scenes/tradeLicense";
import LicensePage from "./scenes/tradeLicense/LicensePage";
import TradeLicenses from "./scenes/tradelicenses";
import UserTransection from "./scenes/transection";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isSideMenuFull, setIsSideMenuFull] = useState(true);
  const isMobile = useMediaQuery("(max-width:640px)");

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar
            setIsSideMenuFull={setIsSideMenuFull}
            isSideMenuFull={isSideMenuFull}
            isSidebar={isSidebar}
          />
          <main
            className={`content ${
              isMobile
                ? "mobile-active"
                : isSideMenuFull
                ? "full-sidebar"
                : "half-sidebar"
            }`}
          >
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="citizens">
                <Route index element={<Citizens />} />
                <Route path="transection/:nid" element={<UserTransection />} />
                <Route
                  path="certificate/:type/:nid"
                  element={<CommonCertificate />}
                />

                <Route path=":nid">
                  <Route index element={<CitizenProfile />} />
                </Route>
              </Route>

              <Route path="/prottoyon" element={<Prottoyon />} />
              <Route path="/businesses">
                <Route index element={<Businesses />} />
                <Route path=":licenseNo" element={<BusinessProfile />} />
              </Route>

              <Route
                path="/tradelicense/:licenseNo"
                element={<SingleLicense />}
              ></Route>

              <Route
                path="/tradelicense/:licenseNo/:slNo"
                element={<LicensePage />}
              />
              <Route path="/tradelicenses" element={<TradeLicenses />} />
              <Route path="/citizenstax" element={<CitizenTax />} />
              <Route path="/businesstax" element={<BusinessTax />} />
              <Route path="/duetax" element={<DueTax />} />

              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/adminform" element={<AdminForm />} />
              <Route path="/businessform" element={<BusinessForm />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
