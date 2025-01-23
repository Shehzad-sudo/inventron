// export default App// App.js
import { registerLicense } from '@syncfusion/ej2-base'
registerLicense('ORg4AjUWIQA/Gnt2XVhhQlJHfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTH5Sd0BjXX9ecnBSQ2hY');


// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
// import styled from 'styled-components';
// import { RibbonComponent, RibbonTabModel } from '@syncfusion/ej2-react-ribbon';

// const App = () => {
//   return (
//     <Router>
//       <MainContainer>
//         <TopNavBar>
//           <NavItem to="/inventory" className={({ isActive }) => (isActive ? 'active' : '')}>
//             Inventory
//           </NavItem>
//           <NavItem to="/sales" className={({ isActive }) => (isActive ? 'active' : '')}>
//             Sales
//           </NavItem>
//           <NavItem to="/settings" className={({ isActive }) => (isActive ? 'active' : '')}>
//             Settings
//           </NavItem>
//         </TopNavBar>
//         <ContentContainer>
//           <Routes>
//             <Route path="/inventory" element={<Inventory />} />
//             <Route path="/sales" element={<Sales />} />
//             <Route path="/settings" element={<Settings />} />
//           </Routes>
//         </ContentContainer>
//       </MainContainer>
//     </Router>
//   );
// };

// // Inventory Component
// const Inventory = () => {
//   const [activeWindow, setActiveWindow] = useState('Items');

//   const inventoryTabs: RibbonTabModel[] = [
//     {
//       header: { text: 'Manage' },
//       groups: [
//         {
//           header: 'Inventory',
//           collections: [
//             {
//               items: [
//                 { text: 'Inventory Items', click: () => setActiveWindow('Items') },
//                 { text: 'Stock', click: () => setActiveWindow('Stock') },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   ];

//   return (
//     <TabContent>
//       <RibbonWrapper>
//         <RibbonComponent id="inventory-ribbon" tabs={inventoryTabs} />
//       </RibbonWrapper>
//       <ContentWindow>
//         {activeWindow === 'Items' && <div>Inventory Items Window</div>}
//         {activeWindow === 'Stock' && <div>Stock Management Window</div>}
//       </ContentWindow>
//     </TabContent>
//   );
// };

// // Sales Component
// const Sales = () => {
//   const [activeWindow, setActiveWindow] = useState('Dashboard');

//   const salesTabs: RibbonTabModel[] = [
//     {
//       header: { text: 'Options' },
//       groups: [
//         {
//           header: 'Sales',
//           collections: [
//             {
//               items: [
//                 { text: 'Sales Dashboard', click: () => setActiveWindow('Dashboard') },
//                 { text: 'Reports', click: () => setActiveWindow('Reports') },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   ];

//   return (
//     <TabContent>
//       <RibbonWrapper>
//         <RibbonComponent id="sales-ribbon" tabs={salesTabs} />
//       </RibbonWrapper>
//       <ContentWindow>
//         {activeWindow === 'Dashboard' && <div>Sales Dashboard Window</div>}
//         {activeWindow === 'Reports' && <div>Sales Reports Window</div>}
//       </ContentWindow>
//     </TabContent>
//   );
// };

// // Settings Component
// const Settings = () => (
//   <ContentWindow>
//     <PageTitle>Application Settings</PageTitle>
//   </ContentWindow>
// );

// // Styled Components
// const MainContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: 100vh;
// `;

// const TopNavBar = styled.nav`
//   display: flex;
//   background-color: #2d3e50;
//   padding: 0;
//   border-bottom: 2px solid #4c637a;
// `;

// const NavItem = styled(NavLink)`
//   flex: 1;
//   text-align: center;
//   padding: 15px 0;
//   color: white;
//   text-decoration: none;
//   font-size: 16px;
//   transition: background-color 0.3s, border-radius 0.3s;

//   &.active {
//     background-color: #ffffff;
//     color: #2d3e50;
//     border-radius: 15px 15px 0 0;
//     font-weight: bold;
//   }

//   &:hover:not(.active) {
//     background-color: #1b2838;
//   }
// `;

// const ContentContainer = styled.div`
//   flex-grow: 1;
//   display: flex;
//   flex-direction: column;
// `;

// const TabContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: 100%;
// `;

// const RibbonWrapper = styled.div`
//   background-color: #f0f0f0;
//   border-bottom: 1px solid #ccc;
//   padding: 10px;
// `;

// const ContentWindow = styled.div`
//   flex-grow: 1;
//   background-color: #f5f5f5;
//   padding: 20px;
//   border: 1px solid #ccc;
//   margin-top: 10px;
// `;

// const PageTitle = styled.h1`
//   font-size: 24px;
//   color: #333;
// `;

// export default App;










import { createRoot } from 'react-dom/client';
import * as React from 'react';
import { useState, useRef } from 'react';
import {
  RibbonComponent,
  RibbonTabsDirective,
  RibbonTabDirective,
  RibbonCollectionsDirective,
  RibbonCollectionDirective,
  RibbonGroupsDirective,
  RibbonGroupDirective,
  RibbonItemsDirective,
  RibbonItemDirective,
  RibbonColorPicker
} from '@syncfusion/ej2-react-ribbon';
import {
  RibbonFileMenu,
  RibbonGallery,
  RibbonItemSize,
  Inject
} from '@syncfusion/ej2-react-ribbon';

import WelcomeSplash from './pages/welcomeSpash';
import InventoryItems from './pages/InventoryItems';
import Sales from './pages/Sales.jsx'

// Define an enum for page types to make switching more reliable
enum PageType {
  WELCOME = 'welcome',
  INVENTORY = 'inventory',
  Sales = 'sales',
  NONE = 'none'
}

const App = () => {
  const ribbonObj = useRef(null);
  // Use string-based state instead of component references
  const [currentPage, setCurrentPage] = useState<PageType>(PageType.NONE);

  const fileOptions = [
    { text: "New", iconCss: "e-icons e-file-new", id: "new" },
    { text: "Open", iconCss: "e-icons e-folder-open", id: "Open" },
    { text: "Rename", iconCss: "e-icons e-rename", id: "rename" },
    {
      text: "Save as", iconCss: "e-icons e-save", id: "save",
      items: [
        { text: "Microsoft Word (.docx)", iconCss: "sf-icon-word", id: "newword" },
        { text: "Microsoft Word 97-2003(.doc)", iconCss: "sf-icon-word", id: "oldword" },
        { text: "Download as PDF", iconCss: "e-icons e-export-pdf", id: "pdf" }
      ]
    }
  ];

  // Helper function to render the current page
  const renderCurrentPage = () => {
    switch (currentPage) {
      case PageType.WELCOME:
        return <WelcomeSplash />;
      case PageType.INVENTORY:
        return <InventoryItems />;
      case PageType.Sales:
        return <Sales />
      default:
        return null; // Or a default page component
    }
  };

  return (
    <div className='control-pane'>
      <div className='control ribbon-sample'>
        <div id="gallery-ribbonContainer" className='ribbon-gallery-container'>
          <RibbonComponent
            id='gallery-ribbon'
            cssClass='ribbonGallery'
            ref={ribbonObj}
            fileMenu={{ visible: true, menuItems: fileOptions }}
          >
            <RibbonTabsDirective>


              <RibbonTabDirective header='Inventory'>
                <RibbonGroupsDirective>
                  <RibbonGroupDirective
                    header="Inventory Data"
                    groupIconCss="e-icons e-zoom-to-fit"
                    orientation="Row"
                  >
                    <RibbonCollectionsDirective>
                      <RibbonCollectionDirective>
                        <RibbonItemsDirective>
                          <RibbonItemDirective
                            type="Button"
                            buttonSettings={{
                              iconCss: "e-icons e-paste",
                              content: "Inventory Items",
                              clicked: () => setCurrentPage(PageType.WELCOME)
                            }}
                          />
                          <RibbonItemDirective
                            type="Button"
                            buttonSettings={{
                              iconCss: "e-icons e-calculate-sheet",
                              content: "Stock Information",
                              clicked: () => setCurrentPage(PageType.INVENTORY)
                            }}
                          />
                        </RibbonItemsDirective>
                      </RibbonCollectionDirective>
                    </RibbonCollectionsDirective>
                  </RibbonGroupDirective>
                  <RibbonGroupDirective header="Show" isCollapsible={true}>
                    <RibbonCollectionsDirective>
                      <RibbonCollectionDirective>
                        <RibbonItemsDirective>
                          <RibbonItemDirective
                            type="CheckBox"
                            checkBoxSettings={{
                              label: "Ruler",
                              checked: false,
                              change: () => { }
                            }}
                          />
                        </RibbonItemsDirective>
                      </RibbonCollectionDirective>
                    </RibbonCollectionsDirective>
                  </RibbonGroupDirective>
                </RibbonGroupsDirective>
              </RibbonTabDirective>



              <RibbonTabDirective header='Transactions'>
                <RibbonGroupsDirective>
                  <RibbonGroupDirective
                    header="Transactions"
                    groupIconCss="e-icons e-zoom-to-fit"
                    orientation="Row"
                  >
                    <RibbonCollectionsDirective>
                      <RibbonCollectionDirective>
                        <RibbonItemsDirective>
                          <RibbonItemDirective
                            type="Button"
                            buttonSettings={{
                              iconCss: "e-icons e-arrow-up",
                              content: "  Sales  ",
                              clicked: () => setCurrentPage(PageType.Sales)
                            }}
                          />
                          <RibbonItemDirective
                            type="Button"
                            buttonSettings={{
                              iconCss: "e-icons e-arrow-down",
                              content: "Purchases",
                              clicked: () => setCurrentPage(PageType.INVENTORY)
                            }}
                          />
                        </RibbonItemsDirective>
                      </RibbonCollectionDirective>
                    </RibbonCollectionsDirective>
                  </RibbonGroupDirective>
                  <RibbonGroupDirective header="Show" isCollapsible={true}>
                    <RibbonCollectionsDirective>
                      <RibbonCollectionDirective>
                        <RibbonItemsDirective>
                          <RibbonItemDirective
                            type="CheckBox"
                            checkBoxSettings={{
                              label: "Ruler",
                              checked: false,
                              change: () => { }
                            }}
                          />
                        </RibbonItemsDirective>
                      </RibbonCollectionDirective>
                    </RibbonCollectionsDirective>
                  </RibbonGroupDirective>
                </RibbonGroupsDirective>
              </RibbonTabDirective>



            </RibbonTabsDirective>
            <Inject services={[RibbonFileMenu, RibbonColorPicker, RibbonGallery]} />
          </RibbonComponent>

          <div id="window-page" className="window-page">
            {renderCurrentPage()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
