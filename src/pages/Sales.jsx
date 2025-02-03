


// import React, { useState } from 'react';
// import { 
//   GridComponent, 
//   ColumnsDirective, 
//   ColumnDirective,
//   Search, 
//   Page,
//   Inject,
//   Toolbar
// } from '@syncfusion/ej2-react-grids';
// import { 
//   DialogComponent 
// } from '@syncfusion/ej2-react-popups';
// import { 
//   ButtonComponent 
// } from '@syncfusion/ej2-react-buttons';
// import { 
//   DropDownButtonComponent,  
// } from '@syncfusion/ej2-react-splitbuttons';
// import { 
//   NumericTextBoxComponent, 
//   TextBoxComponent 
// } from '@syncfusion/ej2-react-inputs';

// const SalesManagement = () => {
//   const [invoices, setInvoices] = useState([]);
//   const [showInvoiceModal, setShowInvoiceModal] = useState(false);
//   const [showItemModal, setShowItemModal] = useState(false);
//   const [selectedInvoice, setSelectedInvoice] = useState(null);

//   const beverageItems = [
//     { id: 1, name: 'Cola', price: 2.50 },
//     { id: 2, name: 'Orange Juice', price: 3.00 },
//     { id: 3, name: 'Sparkling Water', price: 1.50 },
//   ];

//   const createNewInvoice = () => {
//     const newInvoice = {
//       id: `INV-${Date.now()}`,
//       date: new Date().toISOString(),
//       items: [],
//       totalDiscount: 0,
//       status: 'pending',
//       paid: 0,
//       shipped: false,
//       lastUpdated: new Date().toISOString(),
//       printed: false
//     };
//     setInvoices([...invoices, newInvoice]);
//   };

//   const addItemToInvoice = (invoice, item) => {
//     const updatedInvoice = {
//       ...invoice,
//       items: [...invoice.items, { ...item, quantity: 1, discount: 0 }],
//       lastUpdated: new Date().toISOString()
//     };
//     setInvoices(invoices.map(inv => 
//       inv.id === invoice.id ? updatedInvoice : inv
//     ));
//   };

//   const calculateTotal = (invoice) => {
//     const itemsTotal = invoice.items.reduce((sum, item) => 
//       sum + (item.price * item.quantity * (1 - item.discount/100)), 0
//     );
//     return itemsTotal * (1 - invoice.totalDiscount/100);
//   };

//   const gridTemplate = {
//     status: (props) => (
//       <div className={`status-badge status-${props.status.toLowerCase()}`}>
//         {props.status}
//       </div>
//     ),
//     actions: (props) => {
//       const items = [
//         { text: 'View', iconCss: 'e-icons e-eye' },
//         { text: 'Add Items', iconCss: 'e-icons e-add' },
//         { text: 'Delete', iconCss: 'e-icons e-delete' },
//         { text: 'Mark as Printed', iconCss: 'e-icons e-print' }
//       ];

//       const onItemSelect = (args) => {
//         switch(args.item.text) {
//           case 'View':
//             setSelectedInvoice(props);
//             setShowInvoiceModal(true);
//             break;
//           case 'Add Items':
//             setSelectedInvoice(props);
//             setShowItemModal(true);
//             break;
//           case 'Delete':
//             setInvoices(invoices.filter(inv => inv.id !== props.id));
//             break;
//           case 'Mark as Printed':
//             const updated = {...props, printed: true};
//             setInvoices(invoices.map(inv => 
//               inv.id === props.id ? updated : inv
//             ));
//             break;
//         }
//       };

//       return (
//         <DropDownButtonComponent 
//           items={items}
//           iconCss="e-icons e-menu"
//           cssClass="e-small"
//           select={onItemSelect}
//         />
//       );
//     }
//   };

//   const toolbarOptions = ['Search'];

//   const InvoiceDialog = () => (
//     <DialogComponent
//       width="600px"
//       isModal={true}
//       visible={showInvoiceModal}
//       close={() => setShowInvoiceModal(false)}
//     >
//       <div className="dialog-header">
//         <div className="dialog-title">Invoice Details</div>
//       </div>
//       <div className="dialog-content">
//         {selectedInvoice && (
//           <div className="invoice-details">
//             <p>Invoice ID: {selectedInvoice.id}</p>
//             <p>Date: {new Date(selectedInvoice.date).toLocaleDateString()}</p>
            
//             <GridComponent 
//               dataSource={selectedInvoice.items}
//               allowPaging={true}
//               pageSettings={{ pageSize: 5 }}
//             >
//               <ColumnsDirective>
//                 <ColumnDirective field="name" headerText="Item" width="100"/>
//                 <ColumnDirective field="quantity" headerText="Quantity" width="100"/>
//                 <ColumnDirective field="price" headerText="Price" width="100" format="C2"/>
//                 <ColumnDirective field="discount" headerText="Discount %" width="100"/>
//                 <ColumnDirective 
//                   headerText="Total" 
//                   width="100" 
//                   format="C2"
//                   template={(props) => (
//                     <span>
//                       ${(props.price * props.quantity * (1 - props.discount/100)).toFixed(2)}
//                     </span>
//                   )}
//                 />
//               </ColumnsDirective>
//             </GridComponent>

//             <div className="invoice-summary">
//               <p>Total Discount: {selectedInvoice.totalDiscount}%</p>
//               <p>Final Total: ${calculateTotal(selectedInvoice).toFixed(2)}</p>
//               <p>Amount Paid: ${selectedInvoice.paid.toFixed(2)}</p>
//               <p>Status: <span className={`status-badge status-${selectedInvoice.status.toLowerCase()}`}>
//                 {selectedInvoice.status}
//               </span></p>
//             </div>
//           </div>
//         )}
//       </div>
//     </DialogComponent>
//   );

//   const AddItemDialog = () => (
//     <DialogComponent
//       width="400px"
//       isModal={true}
//       visible={showItemModal}
//       close={() => setShowItemModal(false)}
//     >
//       <div className="dialog-header">
//         <div className="dialog-title">Add Item</div>
//       </div>
//       <div className="dialog-content">
//         <div className="items-grid">
//           {beverageItems.map(item => (
//             <ButtonComponent
//               key={item.id}
//               cssClass="e-outline"
//               onClick={() => {
//                 addItemToInvoice(selectedInvoice, item);
//                 setShowItemModal(false);
//               }}
//             >
//               {item.name} - ${item.price.toFixed(2)}
//             </ButtonComponent>
//           ))}
//         </div>
//       </div>
//     </DialogComponent>
//   );

//   return (
//     <div className="sales-management p-3">
//       <div className="header-section">
//         <ButtonComponent
//           cssClass="e-primary"
//           onClick={createNewInvoice}
//         >
//           Create Sales Invoice
//         </ButtonComponent>
//       </div>

//       <GridComponent
//         dataSource={invoices}
//         toolbar={toolbarOptions}
//         allowPaging={true}
//         pageSettings={{ pageSize: 10 }}
//       >
//         <ColumnsDirective>
//           <ColumnDirective field="id" headerText="Invoice ID" width="120"/>
//           <ColumnDirective 
//             field="date" 
//             headerText="Date" 
//             width="120"
//             type="date"
//             format="yMd"
//           />
//           <ColumnDirective 
//             field="items" 
//             headerText="Items" 
//             width="100"
//             template={(props) => <span>{props.items.length}</span>}
//           />
//           <ColumnDirective 
//             headerText="Total" 
//             width="120"
//             template={(props) => <span>${calculateTotal(props).toFixed(2)}</span>}
//           />
//           <ColumnDirective 
//             field="status" 
//             headerText="Status" 
//             width="120"
//             template={gridTemplate.status}
//           />
//           <ColumnDirective 
//             headerText="Actions" 
//             width="100"
//             template={gridTemplate.actions}
//           />
//         </ColumnsDirective>
//         <Inject services={[Search, Page, Toolbar]}/>
//       </GridComponent>

//       <InvoiceDialog />
//       <AddItemDialog />

//       <style jsx>{`
//         .sales-management {
//           font-size: 0.875rem;
//         }
//         .header-section {
//           margin-bottom: 1rem;
//         }
//         .status-badge {
//           padding: 0.25rem 0.5rem;
//           border-radius: 4px;
//           font-size: 0.75rem;
//         }
//         .status-pending {
//           background-color: #ffc107;
//           color: #000;
//         }
//         .status-paid {
//           background-color: #28a745;
//           color: #fff;
//         }
//         .dialog-header {
//           padding: 1rem;
//           border-bottom: 1px solid #dee2e6;
//         }
//         .dialog-title {
//           font-weight: 500;
//         }
//         .dialog-content {
//           padding: 1rem;
//         }
//         .invoice-details {
//           font-size: 0.875rem;
//         }
//         .invoice-summary {
//           margin-top: 1rem;
//           padding-top: 1rem;
//           border-top: 1px solid #dee2e6;
//         }
//         .items-grid {
//           display: grid;
//           gap: 0.5rem;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SalesManagement;




import React, { useState } from 'react';
import { 
  GridComponent, 
  ColumnsDirective, 
  ColumnDirective,
  Inject,
  Toolbar,
  Edit,
  Sort,
  Filter
} from '@syncfusion/ej2-react-grids';
import { 
  DropDownListComponent 
} from '@syncfusion/ej2-react-dropdowns';
import { 
  ButtonComponent 
} from '@syncfusion/ej2-react-buttons';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { DialogComponent } from '@syncfusion/ej2-react-popups';

const PurchasesManagement = () => {
  const [purchaseItems, setPurchaseItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [supplierName, setSupplierName] = useState('');
  const [supplierContact, setSupplierContact] = useState('');
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState('Pending');
  const [amountPaid, setAmountPaid] = useState(0);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  // Inventory items with purchase details
  const inventoryItems = [
    { 
      id: 1, 
      name: 'Cola Syrup', 
      purchasePrice: 50.00, 
      currentStock: 20, 
      restockLevel: 50, 
      sku: 'INGR-001',
      lastPurchaseDate: '2024-01-15'
    },
    { 
      id: 2, 
      name: 'Orange Juice Concentrate', 
      purchasePrice: 75.00, 
      currentStock: 15, 
      restockLevel: 30, 
      sku: 'INGR-002',
      lastPurchaseDate: '2024-01-22'
    },
    { 
      id: 3, 
      name: 'Carbonation Canister', 
      purchasePrice: 100.00, 
      currentStock: 10, 
      restockLevel: 25, 
      sku: 'EQUIP-001',
      lastPurchaseDate: '2024-01-10'
    }
  ];

  const filterSettings = { type: 'Excel' };
  const toolbarOptions = ['Add', 'Edit', 'Delete', 'Cancel']; // Removed 'Update'
  const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };

  let gridInstance= GridComponent;

  const calculateItemTotal = (item) => {
    if (!item) return 0;
    const quantity = item.quantity || 1;
    const price = item.purchasePrice || 0;
    const discount = item.discount || 0;
    return price * quantity * (1 - discount / 100);
  };

  const calculateSubtotal = () => {
    return purchaseItems.reduce((sum, item) => sum + (item.total || 0), 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = totalDiscount || 0;
    return subtotal * (1 - discount / 100);
  };

  const addItemToPurchase = () => {
    if (selectedItem && quantity > 0) {
      const existingItemIndex = purchaseItems.findIndex(item => item.id === selectedItem.id);
      
      if (existingItemIndex !== -1) {
        const updatedItems = [...purchaseItems];
        updatedItems[existingItemIndex] = {
          ...selectedItem,
          quantity: updatedItems[existingItemIndex].quantity + quantity,
          discount: 0,
          total: calculateItemTotal({
            ...selectedItem,
            quantity: updatedItems[existingItemIndex].quantity + quantity,
            discount: 0
          })
        };
        setPurchaseItems(updatedItems);
      } else {
        const newItem = {
          ...selectedItem,
          quantity,
          discount: 0,
          total: calculateItemTotal({
            ...selectedItem,
            quantity,
            discount: 0
          })
        };
        setPurchaseItems([...purchaseItems, newItem]);
      }

      setSelectedItem(null);
      setQuantity(1);
    }
  };

  const handleCompletePurchase = () => {
    const purchaseRecord = {
      id: `PUR-${Date.now()}`,
      date: new Date().toISOString(),
      supplierName,
      items: purchaseItems,
      totalAmount: calculateTotal(),
      amountPaid,
      paymentStatus,
      timestamp: new Date().toLocaleString()
    };

    setPurchaseHistory([purchaseRecord, ...purchaseHistory]);

    setPurchaseItems([]);
    setSupplierName('');
    setSupplierContact('');
    setTotalDiscount(0);
    setPaymentStatus('Pending');
    setAmountPaid(0);
  };

  const paymentStatusOptions = [
    { id: 'Pending', label: 'Not Paid', variant: 'warning' },
    { id: 'Partial', label: 'Partial Paid', variant: 'info' },
    { id: 'Full', label: 'Fully Paid', variant: 'success' }
  ];

  const handleOpenPurchase = (purchase) => {
    setSelectedPurchase(purchase);
    setSupplierName(purchase.supplierName);
    setPurchaseItems(purchase.items);
    
    const loadedSubtotal = purchase.items.reduce((sum, item) => sum + (item.purchasePrice * item.quantity), 0);
    const calculatedDiscount = ((1 - (purchase.totalAmount / loadedSubtotal)) * 100) || 0;
    
    setTotalDiscount(calculatedDiscount);
    setAmountPaid(purchase.amountPaid);
    setPaymentStatus(purchase.paymentStatus);
    setShowHistoryDialog(false);
  };

  const PurchaseHistoryDialog = () => (
    <DialogComponent
      width="800px"
      height="500px"
      isModal={true}
      visible={showHistoryDialog}
      close={() => setShowHistoryDialog(false)}
      showCloseIcon={true}
    >
      <div className="purchase-history-content">
        <h2>Purchase Transaction History</h2>
        <GridComponent 
          dataSource={purchaseItems}
          height="300px"
          allowScrolling={true}
        >
          <ColumnsDirective>
            <ColumnDirective field="name" headerText="Item" width="130"/>
            <ColumnDirective field="quantity" headerText="Quantity" width="100" textAlign="Right" />
            <ColumnDirective field="purchasePrice" headerText="Purchase Price" width="100" format="C2" textAlign="Right" />
            <ColumnDirective field="discount" headerText="Discount %" width="100" textAlign="Right" />
            <ColumnDirective field="total" headerText="Total" width="100" format="C2" textAlign="Right" />
          </ColumnsDirective>
        </GridComponent>
      </div>
    </DialogComponent>
  );

  return (
    <div className="purchases-management">
      <div className="header">
        <h1>Purchases Management</h1>
        <ButtonComponent 
          cssClass="e-outline history-button"
          content="Purchase History"
          onClick={() => setShowHistoryDialog(true)}
        />
      </div>

      <div className="content-wrapper">
        <div className="main-content">
          <div className="purchase-header">
            <div className="supplier-details">
              <TextBoxComponent
                placeholder="Supplier Name"
                value={supplierName}
                change={(e) => setSupplierName(e.value)}
                floatLabelType="Auto"
              />
              <TextBoxComponent
                placeholder="Supplier Contact"
                value={supplierContact}
                change={(e) => setSupplierContact(e.value)}
                floatLabelType="Auto"
              />
            </div>
            
            <div className="item-addition">
              <DropDownListComponent
                dataSource={inventoryItems}
                fields={{ text: 'name', value: 'id' }}
                placeholder="Select Item to Purchase"
                allowFiltering={true}
                filterBarPlaceholder="Search items by name, SKU, or stock"
                change={(args) => {
                  const selected = inventoryItems.find(item => item.id === args.value);
                  setSelectedItem(selected);
                }}
                floatLabelType="Auto"
              />
              
              {selectedItem && (
                <>
                  <TextBoxComponent
                    type="number"
                    value={quantity}
                    min={1}
                    change={(e) => setQuantity(parseInt(e.value))}
                    placeholder="Quantity"
                    floatLabelType="Auto"
                  />
                  <ButtonComponent
                    cssClass="e-success"
                    content="Add"
                    onClick={addItemToPurchase}
                  />
                </>
              )}
            </div>
          </div>
          
          <GridComponent 
            dataSource={purchaseItems}
            ref={grid => gridInstance = grid}
            toolbar={toolbarOptions}
            allowSorting={true}
            allowFiltering={true}
            filterSettings={filterSettings}
            editSettings={editSettings}
            height="300px"
            allowScrolling={true}
          >
            <ColumnsDirective>
              <ColumnDirective field="name" headerText="Item" width="130" />
              <ColumnDirective field="quantity" headerText="Quantity" width="100" textAlign="Right" editType="numericedit" />
              <ColumnDirective field="purchasePrice" headerText="Purchase Price" width="100" format="C2" textAlign="Right" />
              <ColumnDirective field="discount" headerText="Discount %" width="100" textAlign="Right" editType="numericedit" />
              <ColumnDirective field="total" headerText="Total" width="100" format="C2" textAlign="Right" />
            </ColumnsDirective>
            <Inject services={[Toolbar, Edit, Sort, Filter]} />
          </GridComponent>
        </div>

        <div className="purchase-summary">
          <div className="summary-section">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>PKR {calculateSubtotal().toFixed(2)}</span>
            </div>
            
            <div className="discount-section">
              <label>Discount %</label>
              <TextBoxComponent
                type="number"
                value={totalDiscount}
                min={0}
                max={100}
                change={(e) => setTotalDiscount(parseFloat(e.value))}
                floatLabelType="Auto"
              />
              <div className="discount-amount">
                -PKR {(calculateSubtotal() * (totalDiscount / 100)).toFixed(2)}
              </div>
            </div>

            <div className="summary-row total">
              <span>Total:</span>
              <span>PKR {calculateTotal().toFixed(2)}</span>
            </div>
          </div>

          <div className="payment-section">
            <div className="payment-status-buttons">
              {paymentStatusOptions.map((status) => (
                <ButtonComponent
                  key={status.id}
                  cssClass={`e-${paymentStatus === status.id ? 'primary' : 'outline'}`}
                  content={status.label}
                  onClick={() => setPaymentStatus(status.id)}
                />
              ))}
            </div>

            <div className="amount-paid-section">
              <TextBoxComponent
                type="number"
                value={amountPaid}
                min={0}
                max={calculateTotal()}
                change={(e) => setAmountPaid(parseFloat(e.value))}
                placeholder="Amount Paid"
                floatLabelType="Auto"
              />
              <div className="payment-balance">
                <span>Balance:</span>
                <span>PKR {(calculateTotal() - amountPaid).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <ButtonComponent 
              cssClass="e-primary" 
              content="Complete Purchase"
              onClick={handleCompletePurchase}
            />
            <ButtonComponent cssClass="e-outline" content="Save Draft" />
            <ButtonComponent cssClass="e-outline" content="Print" />
          </div>
        </div>
      </div>

      <PurchaseHistoryDialog />

      <style jsx>{`
        .purchases-management {
          display: flex;
          flex-direction: column;
          height: 100vh;
          padding: 1rem;
          overflow: hidden;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .header h1 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #495057;
        }

        .content-wrapper {
          display: flex;
          flex: 1;
          gap: 1rem;
        }

        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: auto;
        }

        .purchase-summary {
          width: 30%;
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 4px;
          overflow: auto;
        }

        .purchase-header {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .supplier-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .item-addition {
          display: grid;
          grid-template-columns: 1fr auto auto;
          gap: 0.5rem;
          align-items: start;
        }

        .summary-section {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 4px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
        }

        .summary-row.total {
          font-weight: 600;
          border-top: 1px solid #dee2e6;
          padding-top: 0.5rem;
        }

        .payment-section {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 4px;
        }

        .payment-status-buttons {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .amount-paid-section {
          margin-top: 1rem;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .purchase-history-content {
          padding: 1rem;
        }
      `}</style>
    </div>
  );
};

export default PurchasesManagement;










