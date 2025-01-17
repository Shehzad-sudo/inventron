import React, { useState } from 'react';
import styled from 'styled-components';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import {
  TextBoxComponent,
  NumericTextBoxComponent,
} from '@syncfusion/ej2-react-inputs';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';


const DialogContent = styled.div`
  padding: 1rem;
  
  .e-upload {
    border-radius: 4px;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 0.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 12px;
  color: #495057;
  margin-bottom: 0.25rem;
`;

const ImagePreview = styled.div`
  width: 100%;
  height: 150px;
  border: 1px dashed #ccc;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const AddItemDialog = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    quantity: 0,
    unitPrice: 0,
    location: '',
    supplier: '',
    minimumStock: 0,
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Validate form data
    if (!formData.name || !formData.sku) {
      alert('Name and SKU are required');
      return;
    }

    onSubmit(formData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      name: '',
      sku: '',
      quantity: 0,
      unitPrice: 0,
      location: '',
      supplier: '',
      minimumStock: 0,
      image: null
    });
    setImagePreview(null);
    onClose();
  };

  const handleImageUpload = (args) => {
    if (args.filesData && args.filesData[0]) {
      const file = args.filesData[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }));
      };

      if (file.rawFile) {
        reader.readAsDataURL(file.rawFile);
      }
    }
  };

  const locations = ['Warehouse A', 'Warehouse B', 'Store Room', 'Main Office'];
  const suppliers = ['Office Depot', 'Tech Solutions', 'Global Supplies', 'Local Vendor'];

  const dialogButtons = [
    {
      buttonModel: {
        content: 'Add Item',
        isPrimary: true,
        cssClass: 'e-small'
      },
      click: handleSubmit
    },
    {
      buttonModel: {
        content: 'Cancel',
        cssClass: 'e-small'
      },
      click: handleClose
    }
  ];

  return (
    <DialogComponent
      width="600px"
      isModal={true}
      visible={isOpen}
      close={handleClose}
      header="Add New Inventory Item"
      showCloseIcon={true}
      buttons={dialogButtons}
      target={document.body}
    >
      <DialogContent>
        <FormGrid>
          <FormGroup>
            <Label>Item Name *</Label>
            <TextBoxComponent
              cssClass="e-small"
              value={formData.name}
              change={(e) => handleInputChange('name', e.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>SKU *</Label>
            <TextBoxComponent
              cssClass="e-small"
              value={formData.sku}
              change={(e) => handleInputChange('sku', e.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Quantity</Label>
            <NumericTextBoxComponent
              cssClass="e-small"
              value={formData.quantity}
              min={0}
              format="n0"
              change={(e) => handleInputChange('quantity', e.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Unit Price</Label>
            <NumericTextBoxComponent
              cssClass="e-small"
              value={formData.unitPrice}
              min={0}
              format="c2"
              change={(e) => handleInputChange('unitPrice', e.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Minimum Stock Level</Label>
            <NumericTextBoxComponent
              cssClass="e-small"
              value={formData.minimumStock}
              min={0}
              format="n0"
              change={(e) => handleInputChange('minimumStock', e.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Location</Label>
            <DropDownListComponent
              cssClass="e-small"
              dataSource={locations}
              value={formData.location}
              change={(e) => handleInputChange('location', e.value)}
              allowFiltering={true}
            />
          </FormGroup>

          <FormGroup>
            <Label>Supplier</Label>
            <DropDownListComponent
              cssClass="e-small"
              dataSource={suppliers}
              value={formData.supplier}
              change={(e) => handleInputChange('supplier', e.value)}
              allowFiltering={true}
            />
          </FormGroup>
        </FormGrid>

        <FormGroup>
          <Label>Item Image</Label>
          <ImagePreview style={{ backgroundImage: imagePreview ? `url(${imagePreview})` : 'none' }}>
            {!imagePreview && 'No image selected'}
          </ImagePreview>
          <UploaderComponent
            cssClass="e-small"
            autoUpload={false}
            multiple={false}
            showFileList={false}
            selected={handleImageUpload}
            allowedExtensions='.jpg,.jpeg,.png'
          />
        </FormGroup>
      </DialogContent>
    </DialogComponent>
  );
};

export default AddItemDialog;