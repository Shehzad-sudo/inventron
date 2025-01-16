// import React, { useState } from 'react';
// import styled from 'styled-components';
// import {
//   TreeViewComponent,
// } from '@syncfusion/ej2-react-navigations';
// import {
//   TextBoxComponent,
//   NumericTextBoxComponent,
// } from '@syncfusion/ej2-react-inputs';
// import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
// import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';

// // We use CSS custom properties for consistent sizing
// const PageContainer = styled.div`
//   --input-height: 28px;
//   --font-size-small: 12px;
//   --font-size-base: 13px;
  
//   display: flex;
//   height: calc(100vh - 60px);
//   background-color: #f8f9fa;
//   gap: 0.5rem;
//   padding: 0.5rem;
//   font-size: var(--font-size-base);
// `;

// const LeftPanel = styled.div`
//   width: 240px;
//   background: white;
//   border-radius: 4px;
//   box-shadow: 0 1px 3px rgba(0,0,0,0.1);
//   overflow-y: auto;
//   padding-top: 0.4rem;

//   /* Target Syncfusion TreeView specific classes */
//   .e-treeview {
//     font-size: var(--font-size-small) !important;
//   }

//   .e-list-item {
//     min-height: 28px !important;
//     line-height: 28px !important;
//     padding: 0.25rem 0.5rem; /* Adjust padding to reduce space */
//   }

//   .e-list-text {
//     font-size: var(--font-size-small) !important;
//   }

//   .e-text-content {
//     padding: 0 !important;
//   }
// `;

// const MainContent = styled.div`
//   flex: 1;
//   background: white;
//   border-radius: 4px;
//   box-shadow: 0 1px 3px rgba(0,0,0,0.1);
//   padding: 1rem;
//   overflow-y: auto;
//   display: grid;
//   grid-template-columns: 1fr 200px;
//   gap: 1rem;
// `;

// const DataSection = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
// `;

// const ImageSection = styled.div`
//   position: sticky;
//   top: 0;
  
//   img {
//     width: 100%;
//     height: 150px;
//     object-fit: cover;
//     border-radius: 4px;
//     border: 1px solid #dee2e6;
//     margin-bottom: 0.5rem;
//   }
  
//   button {
//     margin-top: 0.5rem;
//   }
// `;

// const FormGroup = styled.div`
//   margin-bottom: 0.5rem;
// `;

// const Label = styled.label`
//   display: block;
//   font-size: var(--font-size-small);
//   color: #495057;
//   margin-bottom: 0.25rem;
// `;

// const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 0.75rem;
//   padding-bottom: 0.5rem;
//   border-bottom: 1px solid #dee2e6;
//   font-size: var(--font-size-base);
// `;

// const SearchBar = styled.div`
//   padding: 0.5rem;
//   input {
//     width: 100%;
//     padding: 0.5rem;
//     font-size: var(--font-size-small);
//     border-radius: 4px;
//     border: 1px solid #dee2e6;
//   }
// `;

// // Sample data structure with images
// const inventoryData = [
//   {
//     id: '1',
//     name: 'Office Supplies',
//     expanded: true,
//     items: [
//       { id: '1-1', name: 'Printer Paper A4' },
//       { id: '1-2', name: 'Sticky Notes' },
//     ],
//   },
//   {
//     id: '2',
//     name: 'Electronics',
//     expanded: true,
//     items: [
//       { id: '2-1', name: 'Laptops' },
//       { id: '2-2', name: 'Monitors' },
//     ],
//   },
// ];

// const sampleItemDetails = {
//   'Printer Paper A4': {
//     name: 'Printer Paper A4',
//     sku: 'PP-A4-500',
//     quantity: 50,
//     unitPrice: 4.99,
//     category: 'Office Supplies',
//     lastRestocked: '2024-01-15',
//     minQuantity: 10,
//     location: 'Warehouse A, Shelf 3',
//     supplier: 'Office Depot',
//     image: '/api/placeholder/200/150'
//   },
// };

// const InventoryPage = () => {
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedItem, setEditedItem] = useState(null);
//   const [searchText, setSearchText] = useState('');

//   const commonStyles = {
//     cssClass: 'e-small',
//     height: '28px',
//     floatLabelType: 'Never',
//   };

//   const handleNodeSelect = (args) => {
//     const itemName = args.nodeData.text;
//     if (sampleItemDetails[itemName]) {
//       setSelectedItem(sampleItemDetails[itemName]);
//       setEditedItem(sampleItemDetails[itemName]);
//       setIsEditing(false);
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setEditedItem(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleSearchChange = (e) => {
//     setSearchText(e.target.value);
//   };

//   const filteredData = inventoryData.filter(item =>
//     item.name.toLowerCase().includes(searchText.toLowerCase())
//   );

//   return (
//     <PageContainer>
//       <LeftPanel>
//         <SearchBar>
//           <input 
//             type="text"
//             placeholder="Search items..."
//             value={searchText}
//             onChange={handleSearchChange}
//           />
//         </SearchBar>
//         <Header>
            
//           <span>Inventory Items</span>
//         </Header>
//         <TreeViewComponent 
//           fields={{ 
//             dataSource: filteredData,
//             id: 'id',
//             text: 'name',
//             child: 'items'
//           }}
//           cssClass="e-small"
//           nodeSelected={handleNodeSelect}
//         />
//       </LeftPanel>

//       {selectedItem && (
//         <MainContent>
//           <DataSection>
//             <Header>
//               <span>{selectedItem.name}</span>
//               {!isEditing ? (
//                 <ButtonComponent 
//                   cssClass="e-small e-primary"
//                   {...commonStyles}
//                   onClick={() => setIsEditing(true)}
//                 >
//                   Edit
//                 </ButtonComponent>
//               ) : (
//                 <div style={{ display: 'flex', gap: '0.5rem' }}>
//                   <ButtonComponent
//                     cssClass="e-small e-success"
//                     {...commonStyles}
//                     onClick={() => {
//                       setSelectedItem(editedItem);
//                       setIsEditing(false);
//                     }}
//                   >
//                     Save
//                   </ButtonComponent>
//                   <ButtonComponent
//                     cssClass="e-small e-secondary"
//                     {...commonStyles}
//                     onClick={() => {
//                       setEditedItem(selectedItem);
//                       setIsEditing(false);
//                     }}
//                   >
//                     Cancel
//                   </ButtonComponent>
//                 </div>
//               )}
//             </Header>

//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
//               <FormGroup>
//                 <Label>SKU</Label>
//                 <TextBoxComponent
//                   {...commonStyles}
//                   value={editedItem.sku}
//                   readonly={!isEditing}
//                   onChange={(e) => handleInputChange('sku', e.value)}
//                 />
//               </FormGroup>

//               <FormGroup>
//                 <Label>Category</Label>
//                 <TextBoxComponent
//                   {...commonStyles}
//                   value={editedItem.category}
//                   readonly={!isEditing}
//                   onChange={(e) => handleInputChange('category', e.value)}
//                 />
//               </FormGroup>

//               <FormGroup>
//                 <Label>Quantity</Label>
//                 <NumericTextBoxComponent
//                   {...commonStyles}
//                   value={editedItem.quantity}
//                   readonly={!isEditing}
//                   format="n0"
//                   onChange={(e) => handleInputChange('quantity', e.value)}
//                 />
//               </FormGroup>

//               <FormGroup>
//                 <Label>Unit Price</Label>
//                 <NumericTextBoxComponent
//                   {...commonStyles}
//                   value={editedItem.unitPrice}
//                   readonly={!isEditing}
//                   format="c2"
//                   onChange={(e) => handleInputChange('unitPrice', e.value)}
//                 />
//               </FormGroup>

//               <FormGroup>
//                 <Label>Location</Label>
//                 <TextBoxComponent
//                   {...commonStyles}
//                   value={editedItem.location}
//                   readonly={!isEditing}
//                   onChange={(e) => handleInputChange('location', e.value)}
//                 />
//               </FormGroup>

//               <FormGroup>
//                 <Label>Supplier</Label>
//                 <TextBoxComponent
//                   {...commonStyles}
//                   value={editedItem.supplier}
//                   readonly={!isEditing}
//                   onChange={(e) => handleInputChange('supplier', e.value)}
//                 />
//               </FormGroup>
//             </div>
//           </DataSection>

//           <ImageSection>
//             <img src={editedItem.image} alt={editedItem.name} />
//             <ButtonComponent
//               cssClass="e-small e-primary"
//               onClick={() => alert('Image edit functionality here!')}
//             >
//               Edit Image
//             </ButtonComponent>
//           </ImageSection>
//         </MainContent>
//       )}
//     </PageContainer>
//   );
// };

// export default InventoryPage;




import React, { useState } from 'react';
import styled from 'styled-components';
import {
  TreeViewComponent,
  
} from '@syncfusion/ej2-react-navigations';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';

import {
  TextBoxComponent,
  NumericTextBoxComponent,
} from '@syncfusion/ej2-react-inputs';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';

// We use CSS custom properties for consistent sizing
const PageContainer = styled.div`
  --input-height: 28px;
  --font-size-small: 12px;
  --font-size-base: 13px;
  
  display: flex;
  height: calc(100vh - 60px);
  background-color: #f8f9fa;
  gap: 0.5rem;
  padding: 0.5rem;
  font-size: var(--font-size-base);
`;

const LeftPanel = styled.div`
  width: 240px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  overflow-y: auto;
  padding: 0.5rem;

  .e-treeview {
    font-size: var(--font-size-small) !important;
    padding: 0 !important; /* Remove default padding */
  }

  .e-list-item {
    min-height: 20px !important; /* Reduce item height */
    line-height: 20px !important;
  }

  .e-list-text {
    font-size: var(--font-size-small) !important;
  }

  .e-text-content {
    padding: 0 !important;
  }
`;

const MainContent = styled.div`
  flex: 1;
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  padding: 1rem;
  overflow-y: auto;
  display: grid;
  grid-template-columns: 1fr 200px;
  gap: 1rem;
`;

const DataSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ImageSection = styled.div`
  position: sticky;
  top: 0;
  
  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    margin-bottom: 0.5rem;
  }
  
  button {
    margin-top: 0.5rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 0.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: var(--font-size-small);
  color: #495057;
  margin-bottom: 0.25rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #dee2e6;
  font-size: var(--font-size-base);
`;

const SearchBar = styled.div`
  padding: 0.5rem;
  input {
    width: 100%;
    padding: 0.5rem;
    font-size: var(--font-size-small);
    border-radius: 4px;
    border: 1px solid #dee2e6;
  }
`;

// Sample data structure with images
const inventoryData = [
  {
    id: '1',
    name: 'Office Supplies',
    expanded: true,
    items: [
      { id: '1-1', name: 'Printer Paper A4' },
      { id: '1-2', name: 'Sticky Notes' },
    ],
  },
  {
    id: '2',
    name: 'Electronics',
    expanded: true,
    items: [
      { id: '2-1', name: 'Laptops' },
      { id: '2-2', name: 'Monitors' },
    ],
  },
];

const sampleItemDetails = {
  'Printer Paper A4': {
    name: 'Printer Paper A4',
    sku: 'PP-A4-500',
    quantity: 50,
    unitPrice: 4.99,
    category: 'Office Supplies',
    lastRestocked: '2024-01-15',
    minQuantity: 10,
    location: 'Warehouse A, Shelf 3',
    supplier: 'Office Depot',
    image: '/api/placeholder/200/150'
  },
};

const InventoryPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [searchText, setSearchText] = useState('');

  const commonStyles = {
    cssClass: 'e-small',
    height: '28px',
    floatLabelType: 'Never',
  };

  const handleNodeSelect = (args) => {
    const itemName = args.nodeData.text;
    if (sampleItemDetails[itemName]) {
      setSelectedItem(sampleItemDetails[itemName]);
      setEditedItem(sampleItemDetails[itemName]);
      setIsEditing(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedItem(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredData = inventoryData.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );


  let groupData = [
    {
        'text': 'Audi A4',
        'id': '9bdb',
        'category': 'Audi'
    },
    {
        'text': 'Audi A5',
        'id': '4589',
        'category': 'Audi'
    },
    {
        'text': 'Audi A6',
        'id': 'e807',
        'category': 'Audi'
    },
    {
        'text': 'Audi A7',
        'id': 'a0cc',
        'category': 'Audi'
    },
    {
        'text': 'Audi A8',
        'id': '5e26',
        'category': 'Audi'
    },
];

let fields = { groupBy: 'category' };

  return (
    <PageContainer>
      <LeftPanel>
        <SearchBar>
          <input 
            type="text"
            placeholder="Search items..."
            value={searchText}
            onChange={handleSearchChange}
          />
        </SearchBar>
        <Header>
            
          <span>Inventory Items</span>
        </Header>
        <ListViewComponent
          id="sample-list-group"
          dataSource={groupData}
          fields={fields}
        //   select={handleListSelect}
        />
      
      </LeftPanel>

      {selectedItem && (
        <MainContent>
          <DataSection>
            <Header>
              <span>{selectedItem.name}</span>
              {!isEditing ? (
                <ButtonComponent 
                  cssClass="e-small e-primary"
                  {...commonStyles}
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </ButtonComponent>
              ) : (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <ButtonComponent
                    cssClass="e-small e-success"
                    {...commonStyles}
                    onClick={() => {
                      setSelectedItem(editedItem);
                      setIsEditing(false);
                    }}
                  >
                    Save
                  </ButtonComponent>
                  <ButtonComponent
                    cssClass="e-small e-secondary"
                    {...commonStyles}
                    onClick={() => {
                      setEditedItem(selectedItem);
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </ButtonComponent>
                </div>
              )}
            </Header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <FormGroup>
                <Label>SKU</Label>
                <TextBoxComponent
                  {...commonStyles}
                  value={editedItem.sku}
                  readonly={!isEditing}
                  onChange={(e) => handleInputChange('sku', e.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label>Category</Label>
                <TextBoxComponent
                  {...commonStyles}
                  value={editedItem.category}
                  readonly={!isEditing}
                  onChange={(e) => handleInputChange('category', e.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label>Quantity</Label>
                <NumericTextBoxComponent
                  {...commonStyles}
                  value={editedItem.quantity}
                  readonly={!isEditing}
                  format="n0"
                  onChange={(e) => handleInputChange('quantity', e.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label>Unit Price</Label>
                <NumericTextBoxComponent
                  {...commonStyles}
                  value={editedItem.unitPrice}
                  readonly={!isEditing}
                  format="c2"
                  onChange={(e) => handleInputChange('unitPrice', e.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label>Location</Label>
                <TextBoxComponent
                  {...commonStyles}
                  value={editedItem.location}
                  readonly={!isEditing}
                  onChange={(e) => handleInputChange('location', e.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label>Supplier</Label>
                <TextBoxComponent
                  {...commonStyles}
                  value={editedItem.supplier}
                  readonly={!isEditing}
                  onChange={(e) => handleInputChange('supplier', e.value)}
                />
              </FormGroup>
            </div>
          </DataSection>

          <ImageSection>
            <img src={editedItem.image} alt={editedItem.name} />
            <ButtonComponent
              cssClass="e-small e-primary"
              onClick={() => alert('Image edit functionality here!')}
            >
              Edit Image
            </ButtonComponent>
          </ImageSection>
        </MainContent>
      )}
    </PageContainer>
  );
};

export default InventoryPage;
