
// import React, { useState, useRef, useEffect } from 'react';
// import { 
//   GridComponent, 
//   ColumnsDirective, 
//   ColumnDirective,
//   Edit,
//   Toolbar,
//   Inject,
//   CommandColumn
// } from '@syncfusion/ej2-react-grids';
// import { 
//   DropDownListComponent 
// } from '@syncfusion/ej2-react-dropdowns';
// import { 
//   NumericTextBoxComponent 
// } from '@syncfusion/ej2-react-inputs';
// import { 
//   ButtonComponent 
// } from '@syncfusion/ej2-react-buttons';
// import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';

// const SalesWindow = () => {
//   const [invoiceItems, setInvoiceItems] = useState([]);
//   const [totalDiscount, setTotalDiscount] = useState(0);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [customerName, setCustomerName] = useState('');
//   const [customerPhone, setCustomerPhone] = useState('');
//   const [paymentStatus, setPaymentStatus] = useState('Pending');
//   const [amountPaid, setAmountPaid] = useState(0);
//   const quantityInputRef = useRef(null);
//   const addButtonRef = useRef(null);
//   const dropdownRef = useRef(null);

//   // Enhanced inventory items with more details
//   const inventoryItems = [
//     { id: 1, name: 'Cola', price: 2.50, stock: 100, sku: 'BEV001' },
//     { id: 2, name: 'Orange Juice', price: 3.00, stock: 75, sku: 'BEV002' },
//     { id: 3, name: 'Sparkling Water', price: 1.50, stock: 150, sku: 'BEV003' },
//     { id: 4, name: 'Energy Drink', price: 4.00, stock: 50, sku: 'BEV004' },
//   ];

//   // Custom item template for dropdown
//   const itemTemplate = (item) => {
//     return (
//       <div className="item-template">
//         <div className="item-name">{item.name}</div>
//         <div className="item-details">
//           <span>Price: ${item.price.toFixed(2)}</span>
//           <span>Stock: {item.stock}</span>
//           <span>SKU: {item.sku}</span>
//         </div>
//       </div>
//     );
//   };

//   const calculateItemTotal = (item) => {
//     return item.price * item.quantity * (1 - item.discount/100);
//   };

//   const calculateSubtotal = () => {
//     return invoiceItems.reduce((sum, item) => sum + calculateItemTotal(item), 0);
//   };

//   const calculateTotal = () => {
//     const subtotal = calculateSubtotal();
//     return subtotal * (1 - totalDiscount/100);
//   };

//   const addItemToInvoice = () => {
//     if (selectedItem && quantity > 0) {
//       const existingItemIndex = invoiceItems.findIndex(item => item.id === selectedItem.id);
      
//       if (existingItemIndex !== -1) {
//         // Update existing item
//         const updatedItems = [...invoiceItems];
//         updatedItems[existingItemIndex] = {
//           ...selectedItem,
//           quantity: updatedItems[existingItemIndex].quantity + quantity,
//           discount: 0,
//           total: calculateItemTotal({
//             ...selectedItem,
//             quantity: updatedItems[existingItemIndex].quantity + quantity,
//             discount: 0
//           })
//         };
//         setInvoiceItems(updatedItems);
//       } else {
//         // Add new item
//         const newItem = {
//           ...selectedItem,
//           quantity,
//           discount: 0,
//           total: calculateItemTotal({
//             ...selectedItem,
//             quantity,
//             discount: 0
//           })
//         };
//         setInvoiceItems([...invoiceItems, newItem]);
//       }

//       // Reset selection
//       setSelectedItem(null);
//       setQuantity(1);
//       if (dropdownRef.current) {
//         dropdownRef.current.value = null;
//         dropdownRef.current.focusIn();
//       }
//     }
//   };

//   const updateItemInGrid = (rowData, field, value) => {
//     const updatedItems = invoiceItems.map(item => 
//       item.id === rowData.id 
//         ? {
//             ...item, 
//             [field]: value,
//             total: calculateItemTotal({
//               ...item,
//               [field]: value
//             })
//           }
//         : item
//     );
//     setInvoiceItems(updatedItems);
//   };

//   const paymentStatusOptions = [
//     { id: 'Pending', label: 'Not Paid', variant: 'warning' },
//     { id: 'Partial', label: 'Partial Paid', variant: 'info' },
//     { id: 'Full', label: 'Fully Paid', variant: 'success' }
//   ];

//   const handlePaymentStatusChange = (status) => {
//     setPaymentStatus(status);
    
//     // Automatically set amount paid based on status
//     switch(status) {
//       case 'Pending':
//         setAmountPaid(0);
//         break;
//       case 'Partial':
//         setAmountPaid(calculateTotal() / 2);
//         break;
//       case 'Full':
//         setAmountPaid(calculateTotal());
//         break;
//     }
//   };

//   return (
//     <div className="sales-invoice-creator">
//       <div className="left-panel">
//         <div className="panel-heading">Sales Invoice Creation</div>
        
//         <div className="invoice-header">
//           <div className="customer-details">
//             <TextBoxComponent
//               placeholder="Customer Name"
//               value={customerName}
//               change={(e) => setCustomerName(e.value)}
//             />
//             <TextBoxComponent
//               placeholder="Phone Number"
//               value={customerPhone}
//               change={(e) => setCustomerPhone(e.value)}
//             />
//           </div>
          
//           <div className="item-addition">
//             <DropDownListComponent
//               ref={dropdownRef}
//               dataSource={inventoryItems}
//               fields={{ text: 'name', value: 'id' }}
//               placeholder="Select Item"
//               itemTemplate={itemTemplate}
//               change={(args) => {
//                 const selected = inventoryItems.find(item => item.id === args.value);
//                 setSelectedItem(selected);
//                 if (selected) quantityInputRef.current?.focusIn();
//               }}
//             />
            
//             {selectedItem && (
//               <>
//                 <NumericTextBoxComponent
//                   ref={quantityInputRef}
//                   value={quantity}
//                   min={1}
//                   max={selectedItem.stock}
//                   format="n0"
//                   change={(args) => setQuantity(args.value)}
//                 />
//                 <ButtonComponent
//                   ref={addButtonRef}
//                   cssClass="e-success"
//                   content="Add"
//                   onClick={addItemToInvoice}
//                 />
//               </>
//             )}
//           </div>
//         </div>
        
//         <GridComponent 
//           dataSource={invoiceItems}
//           height="calc(100vh - 250px)"
//         >
//           <ColumnsDirective>
//             <ColumnDirective field="name" headerText="Item" width="130"/>
//             <ColumnDirective 
//               field="quantity" 
//               headerText="Quantity" 
//               width="100"
//               template={(props) => (
//                 <NumericTextBoxComponent
//                   value={props.quantity}
//                   min={1}
//                   change={(args) => updateItemInGrid(props, 'quantity', args.value)}
//                 />
//               )}
//             />
//             <ColumnDirective 
//               field="price" 
//               headerText="Price" 
//               width="100"
//               format="C2"
//             />
//             <ColumnDirective 
//               field="discount" 
//               headerText="Discount %" 
//               width="100"
//               template={(props) => (
//                 <NumericTextBoxComponent
//                   value={props.discount}
//                   min={0}
//                   max={100}
//                   change={(args) => updateItemInGrid(props, 'discount', args.value)}
//                 />
//               )}
//             />
//             <ColumnDirective 
//               field="total" 
//               headerText="Total" 
//               width="100"
//               format="C2"
//             />
//           </ColumnsDirective>
//           <Inject services={[Edit, Toolbar, CommandColumn]}/>
//         </GridComponent>
//       </div>

//       <div className="right-panel">
//         <div className="invoice-summary">
//           <h3>Invoice Summary</h3>
          
//           <div className="summary-section">
//             <div className="summary-row">
//               <span>Subtotal:</span>
//               <span>${calculateSubtotal().toFixed(2)}</span>
//             </div>
            
//             <div className="discount-section">
//               <label>Discount %</label>
//               <NumericTextBoxComponent
//                 value={totalDiscount}
//                 min={0}
//                 max={100}
//                 format="n2"
//                 change={(args) => setTotalDiscount(args.value)}
//               />
//               <div className="discount-amount">
//                 -${(calculateSubtotal() * (totalDiscount/100)).toFixed(2)}
//               </div>
//             </div>

//             <div className="summary-row total">
//               <span>Total:</span>
//               <span>${calculateTotal().toFixed(2)}</span>
//             </div>
//           </div>

//           <div className="payment-section">
//             <h4>Payment Details</h4>
//             <div className="payment-status-buttons">
//               {paymentStatusOptions.map((status) => (
//                 <ButtonComponent
//                   key={status.id}
//                   cssClass={`e-${paymentStatus === status.id ? 'primary' : 'outline'}`}
//                   content={status.label}
//                   onClick={() => handlePaymentStatusChange(status.id)}
//                 />
//               ))}
//             </div>

//             <div className="amount-paid-section">
//               <NumericTextBoxComponent
//                 value={amountPaid}
//                 min={0}
//                 max={calculateTotal()}
//                 format="c2"
//                 change={(args) => setAmountPaid(args.value)}
//                 placeholder="Amount Paid"
//               />
//               <div className="payment-balance">
//                 <span>Balance:</span>
//                 <span>${(calculateTotal() - amountPaid).toFixed(2)}</span>
//               </div>
//             </div>
//           </div>

//           <div className="action-buttons">
//             <ButtonComponent cssClass="e-primary" content="Complete Sale" />
//             <ButtonComponent cssClass="e-outline" content="Save Draft" />
//             <ButtonComponent cssClass="e-outline" content="Print" />
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .panel-heading {
//           font-size: 1.2rem;
//           font-weight: 600;
//           margin-bottom: 1rem;
//           color: #495057;
//         }

//         .item-template {
//           display: flex;
//           flex-direction: column;
//         }

//         .item-name {
//           font-weight: 600;
//         }

//         .item-details {
//           display: flex;
//           justify-content: space-between;
//           font-size: 0.8rem;
//           color: #6c757d;
//         }

//         .payment-status-buttons {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 0.5rem;
//           margin-bottom: 1rem;
//         }

//         .amount-paid-section {
//           display: flex;
//           flex-direction: column;
//           gap: 0.5rem;
//         }

//         .payment-balance {
//           display: flex;
//           justify-content: space-between;
//           font-weight: 600;
//           color: #dc3545;
//         }

//         /* Rest of the previous styles remain the same */        .sales-invoice-creator {
//             display: grid;
//             grid-template-columns: 1fr 350px;
//             gap: 1rem;
//             padding: 1rem;
//             height: 100vh;
//           }
  
//           .left-panel {
//             display: flex;
//             flex-direction: column;
//             gap: 1rem;
//           }
  
//           .invoice-header {
//             display: flex;
//             flex-direction: column;
//             gap: 1rem;
//           }
  
//           .customer-details {
//             display: grid;
//             grid-template-columns: 1fr 1fr;
//             gap: 1rem;
//           }
  
//           .item-addition {
//             display: grid;
//             grid-template-columns: 1fr auto auto;
//             gap: 0.5rem;
//             align-items: start;
//           }
  
//           .right-panel {
//             background: #f8f9fa;
//             padding: 1rem;
//             border-radius: 4px;
//             height: calc(100vh - 2rem);
//             overflow-y: auto;
//           }
  
//           .invoice-summary {
//             display: flex;
//             flex-direction: column;
//             gap: 1.5rem;
//           }
  
//           .summary-section {
//             display: flex;
//             flex-direction: column;
//             gap: 1rem;
//           }
  
//           .summary-row {
//             display: flex;
//             justify-content: space-between;
//             font-size: 1rem;
//           }
  
//           .summary-row.total {
//             font-size: 1.2rem;
//             font-weight: 600;
//             border-top: 2px solid #dee2e6;
//             padding-top: 1rem;
//             margin-top: 0.5rem;
//           }
  
//           .discount-section {
//             display: flex;
//             flex-direction: column;
//             gap: 0.5rem;
//             padding: 1rem;
//             background: #fff;
//             border-radius: 4px;
//           }
  
//           .discount-amount {
//             text-align: right;
//             color: #dc3545;
//           }
  
//           .payment-section {
//             display: flex;
//             flex-direction: column;
//             gap: 1rem;
//           }
  
//           .payment-methods {
//             display: grid;
//             grid-template-columns: repeat(3, 1fr);
//             gap: 0.5rem;
//           }
  
//           .action-buttons {
//             display: flex;
//             flex-direction: column;
//             gap: 0.5rem;
//             margin-top: auto;
//           }
  
//           h3, h4 {
//             margin: 0;
//             color: #495057;
//           }
  
//           h3 { font-size: 1.2rem; }
//           h4 { font-size: 1rem; }
//         `}</style>
//     </div>
//   );
// };

// export default SalesWindow;











import React, { useState } from 'react';
import { 
  GridComponent, 
  ColumnsDirective, 
  ColumnDirective,
  Search, 
  Page,
  Inject,
  Toolbar
} from '@syncfusion/ej2-react-grids';
import { 
  DialogComponent 
} from '@syncfusion/ej2-react-popups';
import { 
  ButtonComponent 
} from '@syncfusion/ej2-react-buttons';
import { 
  DropDownButtonComponent,  
} from '@syncfusion/ej2-react-splitbuttons';
import { 
  NumericTextBoxComponent, 
  TextBoxComponent 
} from '@syncfusion/ej2-react-inputs';

const InvoiceWindow = () => {
  const [invoices, setInvoices] = useState([]);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const beverageItems = [
    { id: 1, name: 'Cola', price: 2.50 },
    { id: 2, name: 'Orange Juice', price: 3.00 },
    { id: 3, name: 'Sparkling Water', price: 1.50 },
  ];

  const createNewInvoice = () => {
    const newInvoice = {
      id: `INV-${Date.now()}`,
      date: new Date().toISOString(),
      items: [],
      totalDiscount: 0,
      status: 'pending',
      paid: 0,
      shipped: false,
      lastUpdated: new Date().toISOString(),
      printed: false
    };
    setInvoices([...invoices, newInvoice]);
  };

  const addItemToInvoice = (invoice, item) => {
    const updatedInvoice = {
      ...invoice,
      items: [...invoice.items, { ...item, quantity: 1, discount: 0 }],
      lastUpdated: new Date().toISOString()
    };
    setInvoices(invoices.map(inv => 
      inv.id === invoice.id ? updatedInvoice : inv
    ));
  };

  const calculateTotal = (invoice) => {
    const itemsTotal = invoice.items.reduce((sum, item) => 
      sum + (item.price * item.quantity * (1 - item.discount/100)), 0
    );
    return itemsTotal * (1 - invoice.totalDiscount/100);
  };

  const gridTemplate = {
    status: (props) => (
      <div className={`status-badge status-${props.status.toLowerCase()}`}>
        {props.status}
      </div>
    ),
    actions: (props) => {
      const items = [
        { text: 'View', iconCss: 'e-icons e-eye' },
        { text: 'Add Items', iconCss: 'e-icons e-add' },
        { text: 'Delete', iconCss: 'e-icons e-delete' },
        { text: 'Mark as Printed', iconCss: 'e-icons e-print' }
      ];

      const onItemSelect = (args) => {
        switch(args.item.text) {
          case 'View':
            setSelectedInvoice(props);
            setShowInvoiceModal(true);
            break;
          case 'Add Items':
            setSelectedInvoice(props);
            setShowItemModal(true);
            break;
          case 'Delete':
            setInvoices(invoices.filter(inv => inv.id !== props.id));
            break;
          case 'Mark as Printed':
            const updated = {...props, printed: true};
            setInvoices(invoices.map(inv => 
              inv.id === props.id ? updated : inv
            ));
            break;
        }
      };

      return (
        <DropDownButtonComponent 
          items={items}
          iconCss="e-icons e-menu"
          cssClass="e-small"
          select={onItemSelect}
        />
      );
    }
  };

  const toolbarOptions = ['Search'];

  const InvoiceDialog = () => (
    <DialogComponent
      width="600px"
      isModal={true}
      visible={showInvoiceModal}
      close={() => setShowInvoiceModal(false)}
    >
      <div className="dialog-header">
        <div className="dialog-title">Invoice Details</div>
      </div>
      <div className="dialog-content">
        {selectedInvoice && (
          <div className="invoice-details">
            <p>Invoice ID: {selectedInvoice.id}</p>
            <p>Date: {new Date(selectedInvoice.date).toLocaleDateString()}</p>
            
            <GridComponent 
              dataSource={selectedInvoice.items}
              allowPaging={true}
              pageSettings={{ pageSize: 5 }}
            >
              <ColumnsDirective>
                <ColumnDirective field="name" headerText="Item" width="100"/>
                <ColumnDirective field="quantity" headerText="Quantity" width="100"/>
                <ColumnDirective field="price" headerText="Price" width="100" format="C2"/>
                <ColumnDirective field="discount" headerText="Discount %" width="100"/>
                <ColumnDirective 
                  headerText="Total" 
                  width="100" 
                  format="C2"
                  template={(props) => (
                    <span>
                      ${(props.price * props.quantity * (1 - props.discount/100)).toFixed(2)}
                    </span>
                  )}
                />
              </ColumnsDirective>
            </GridComponent>

            <div className="invoice-summary">
              <p>Total Discount: {selectedInvoice.totalDiscount}%</p>
              <p>Final Total: ${calculateTotal(selectedInvoice).toFixed(2)}</p>
              <p>Amount Paid: ${selectedInvoice.paid.toFixed(2)}</p>
              <p>Status: <span className={`status-badge status-${selectedInvoice.status.toLowerCase()}`}>
                {selectedInvoice.status}
              </span></p>
            </div>
          </div>
        )}
      </div>
    </DialogComponent>
  );

  const AddItemDialog = () => (
    <DialogComponent
      width="400px"
      isModal={true}
      visible={showItemModal}
      close={() => setShowItemModal(false)}
    >
      <div className="dialog-header">
        <div className="dialog-title">Add Item</div>
      </div>
      <div className="dialog-content">
        <div className="items-grid">
          {beverageItems.map(item => (
            <ButtonComponent
              key={item.id}
              cssClass="e-outline"
              onClick={() => {
                addItemToInvoice(selectedInvoice, item);
                setShowItemModal(false);
              }}
            >
              {item.name} - ${item.price.toFixed(2)}
            </ButtonComponent>
          ))}
        </div>
      </div>
    </DialogComponent>
  );

  return (
    <div className="sales-management p-3">
      <div className="header-section">
        <ButtonComponent
          cssClass="e-primary"
          onClick={createNewInvoice}
        >
          Create Sales Invoice
        </ButtonComponent>
      </div>

      <GridComponent
        dataSource={invoices}
        toolbar={toolbarOptions}
        allowPaging={true}
        pageSettings={{ pageSize: 10 }}
      >
        <ColumnsDirective>
          <ColumnDirective field="id" headerText="Invoice ID" width="120"/>
          <ColumnDirective 
            field="date" 
            headerText="Date" 
            width="120"
            type="date"
            format="yMd"
          />
          <ColumnDirective 
            field="items" 
            headerText="Items" 
            width="100"
            template={(props) => <span>{props.items.length}</span>}
          />
          <ColumnDirective 
            headerText="Total" 
            width="120"
            template={(props) => <span>${calculateTotal(props).toFixed(2)}</span>}
          />
          <ColumnDirective 
            field="status" 
            headerText="Status" 
            width="120"
            template={gridTemplate.status}
          />
          <ColumnDirective 
            headerText="Actions" 
            width="100"
            template={gridTemplate.actions}
          />
        </ColumnsDirective>
        <Inject services={[Search, Page, Toolbar]}/>
      </GridComponent>

      <InvoiceDialog />
      <AddItemDialog />

      <style jsx>{`
        .sales-management {
          font-size: 0.875rem;
        }
        .header-section {
          margin-bottom: 1rem;
        }
        .status-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
        }
        .status-pending {
          background-color: #ffc107;
          color: #000;
        }
        .status-paid {
          background-color: #28a745;
          color: #fff;
        }
        .dialog-header {
          padding: 1rem;
          border-bottom: 1px solid #dee2e6;
        }
        .dialog-title {
          font-weight: 500;
        }
        .dialog-content {
          padding: 1rem;
        }
        .invoice-details {
          font-size: 0.875rem;
        }
        .invoice-summary {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #dee2e6;
        }
        .items-grid {
          display: grid;
          gap: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default InvoiceWindow;
