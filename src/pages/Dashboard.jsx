
import React, { useState } from 'react';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Toolbar,
  Page,
  Sort,
  Filter
} from '@syncfusion/ej2-react-grids';
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  LineSeries,
  DateTime,
  Legend,
  Tooltip,
  Category
} from '@syncfusion/ej2-react-charts';
import {
  DropDownListComponent
} from '@syncfusion/ej2-react-dropdowns';
import {
  ButtonComponent
} from '@syncfusion/ej2-react-buttons';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { FaChartLine, FaBox, FaMoneyBillWave, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const Dashboard = () => {
  const [timeFilter, setTimeFilter] = useState('Monthly');
  const [showLowStockGrid, setShowLowStockGrid] = useState(false);
  const [showFastMovingGrid, setShowFastMovingGrid] = useState(false);

  // Dummy data for demonstration
  const profitData = {
    Monthly: [
      { month: new Date(2024, 0, 1), profit: 50000, revenue: 150000, spent: 100000 },
      { month: new Date(2024, 1, 1), profit: 60000, revenue: 160000, spent: 100000 },
      { month: new Date(2024, 2, 1), profit: 70000, revenue: 170000, spent: 100000 },
      { month: new Date(2024, 3, 1), profit: 80000, revenue: 180000, spent: 100000 },
      { month: new Date(2024, 4, 1), profit: 90000, revenue: 190000, spent: 100000 },
      { month: new Date(2024, 5, 1), profit: 100000, revenue: 200000, spent: 100000 },
    ],
    Weekly: [
      { month: new Date(2024, 0, 1), profit: 10000, revenue: 30000, spent: 20000 },
      { month: new Date(2024, 0, 8), profit: 15000, revenue: 35000, spent: 20000 },
      { month: new Date(2024, 0, 15), profit: 20000, revenue: 40000, spent: 20000 },
      { month: new Date(2024, 0, 22), profit: 25000, revenue: 45000, spent: 20000 },
    ],
    Custom: [
      { month: new Date(2024, 0, 1), profit: 5000, revenue: 15000, spent: 10000 },
      { month: new Date(2024, 0, 2), profit: 10000, revenue: 20000, spent: 10000 },
    ],
  };

  const lowStockItems = [
    { id: 1, name: 'Cola Syrup', stock: 5, restockLevel: 50 },
    { id: 2, name: 'Orange Juice Concentrate', stock: 10, restockLevel: 30 },
    { id: 3, name: 'Carbonation Canister', stock: 8, restockLevel: 25 },
  ];

  const fastMovingItems = [
    { id: 1, name: 'Cola Syrup', sold: 150 },
    { id: 2, name: 'Orange Juice Concentrate', sold: 120 },
    { id: 3, name: 'Carbonation Canister', sold: 90 },
  ];

  const slowMovingItems = [
    { id: 4, name: 'Lemon Syrup', sold: 20 },
    { id: 5, name: 'Ginger Ale Concentrate', sold: 15 },
    { id: 6, name: 'Soda Canister', sold: 10 },
  ];

  const mostProfitableItems = [
    { id: 1, name: 'Cola Syrup', profit: 50000 },
    { id: 2, name: 'Orange Juice Concentrate', profit: 40000 },
    { id: 3, name: 'Carbonation Canister', profit: 30000 },
  ];

  const timeFilters = ['Monthly', 'Weekly', 'Custom'];

  // Calculate KPIs
  const totalProfit = profitData[timeFilter].reduce((sum, item) => sum + item.profit, 0);
  const totalRevenue = profitData[timeFilter].reduce((sum, item) => sum + item.revenue, 0);
  const totalSpent = profitData[timeFilter].reduce((sum, item) => sum + item.spent, 0);

  // Handlers
  const handleTimeFilterChange = (args) => {
    setTimeFilter(args.value);
  };

  const handleLowStockClick = () => {
    setShowLowStockGrid(true);
  };

  const handleFastMovingClick = () => {
    setShowFastMovingGrid(true);
  };

  const handleCloseDialog = () => {
    setShowLowStockGrid(false);
    setShowFastMovingGrid(false);
  };

  return (
    <div className="dashboard">
      <div className="header">
        <h1>Dashboard</h1>
        <div className="time-filter">
          <DropDownListComponent
            dataSource={timeFilters}
            value={timeFilter}
            change={handleTimeFilterChange}
            placeholder="Select Time Filter"
            floatLabelType="Auto"
          />
        </div>
      </div>

      <div className="kpi-cards">
        <div className="kpi-card profit">
          <FaMoneyBillWave className="icon" />
          <h3>Total Profit</h3>
          <p>PKR {totalProfit.toLocaleString()}</p>
        </div>
        <div className="kpi-card revenue">
          <FaChartLine className="icon" />
          <h3>Total Revenue</h3>
          <p>PKR {totalRevenue.toLocaleString()}</p>
        </div>
        <div className="kpi-card spent">
          <FaBox className="icon" />
          <h3>Total Spent</h3>
          <p>PKR {totalSpent.toLocaleString()}</p>
        </div>
      </div>

      <div className="main-content">
        <div className="chart-section">
          <ChartComponent
            id="line-chart"
            primaryXAxis={{ 
              valueType: 'DateTime',
              labelFormat: 'MMM',
              intervalType: 'Months'
            }}
            primaryYAxis={{ 
              title: 'Amount (PKR)',
              labelFormat: 'n0'
            }}
            tooltip={{ enable: true }}
            legendSettings={{ visible: true }}
          >
            <SeriesCollectionDirective>
              <SeriesDirective
                dataSource={profitData[timeFilter]}
                xName="month"
                yName="profit"
                type="Line"
                name="Profit"
                marker={{ visible: true }}
              />
              <SeriesDirective
                dataSource={profitData[timeFilter]}
                xName="month"
                yName="revenue"
                type="Line"
                name="Revenue"
                marker={{ visible: true }}
              />
              <SeriesDirective
                dataSource={profitData[timeFilter]}
                xName="month"
                yName="spent"
                type="Line"
                name="Spent"
                marker={{ visible: true }}
              />
            </SeriesCollectionDirective>
            <Inject services={[LineSeries, DateTime, Legend, Tooltip, Category]} />
          </ChartComponent>
        </div>

        <div className="scrollable-cards">
          <div className="scrollable-card">
            <h3><FaArrowUp className="icon" /> Fast & Slow Moving Items</h3>
            <div className="scrollable-content">
              {fastMovingItems.map((item) => (
                <div key={item.id} className="item">
                  <span>{item.name}</span>
                  <span>{item.sold} sold</span>
                </div>
              ))}
              {slowMovingItems.map((item) => (
                <div key={item.id} className="item">
                  <span>{item.name}</span>
                  <span>{item.sold} sold</span>
                </div>
              ))}
            </div>
          </div>

          <div className="scrollable-card">
            <h3><FaArrowDown className="icon" /> Most Profitable Items</h3>
            <div className="scrollable-content">
              {mostProfitableItems.map((item) => (
                <div key={item.id} className="item">
                  <span>{item.name}</span>
                  <span>PKR {item.profit.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="indicators">
        <div className="indicator low-stock" onClick={handleLowStockClick}>
          <h3>Low Stock Items</h3>
          <p>{lowStockItems.length} items need restocking</p>
        </div>
        <div className="indicator fast-moving" onClick={handleFastMovingClick}>
          <h3>Fast Moving Items</h3>
          <p>{fastMovingItems.length} items selling quickly</p>
        </div>
      </div>

      {/* Dialogs for Detailed Views */}
      <DialogComponent
        width="800px"
        height="500px"
        isModal={true}
        visible={showLowStockGrid}
        close={handleCloseDialog}
        showCloseIcon={true}
      >
        <div className="dialog-content">
          <h2>Low Stock Items</h2>
          <GridComponent
            dataSource={lowStockItems}
            allowPaging={true}
            pageSettings={{ pageSize: 5 }}
            allowSorting={true}
            allowFiltering={true}
          >
            <ColumnsDirective>
              <ColumnDirective field="name" headerText="Item Name" width="150" />
              <ColumnDirective field="stock" headerText="Current Stock" width="100" textAlign="Right" />
              <ColumnDirective field="restockLevel" headerText="Restock Level" width="100" textAlign="Right" />
            </ColumnsDirective>
            <Inject services={[Page, Sort, Filter]} />
          </GridComponent>
        </div>
      </DialogComponent>

      <DialogComponent
        width="800px"
        height="500px"
        isModal={true}
        visible={showFastMovingGrid}
        close={handleCloseDialog}
        showCloseIcon={true}
      >
        <div className="dialog-content">
          <h2>Fast Moving Items</h2>
          <GridComponent
            dataSource={fastMovingItems}
            allowPaging={true}
            pageSettings={{ pageSize: 5 }}
            allowSorting={true}
            allowFiltering={true}
          >
            <ColumnsDirective>
              <ColumnDirective field="name" headerText="Item Name" width="150" />
              <ColumnDirective field="sold" headerText="Units Sold" width="100" textAlign="Right" />
            </ColumnsDirective>
            <Inject services={[Page, Sort, Filter]} />
          </GridComponent>
        </div>
      </DialogComponent>

      <style jsx="true">{`
        .dashboard {
          display: flex;
          flex-direction: column;
          padding: 2rem;
          gap: 2rem;
          background: #f8f9fa;
          min-height: 100vh;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #fff;
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .kpi-cards {
          display: flex;
          gap: 1rem;
        }

        .kpi-card {
          flex: 1;
          background: #fff;
          padding: 1.5rem;
          border-radius: 8px;
          text-align: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .kpi-card h3 {
          margin: 0;
          font-size: 1.25rem;
          color: #495057;
        }

        .kpi-card p {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 600;
          color: #2ecc71;
        }

        .kpi-card.spent p {
          color: #e74c3c;
        }

        .icon {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .main-content {
          display: flex;
          gap: 1rem;
        }

        .chart-section {
          flex: 1;
          background: #fff;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .scrollable-cards {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .scrollable-card {
          flex: 1;
          background: #fff;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          max-height: 300px;
          overflow-y: auto;
        }

        .scrollable-card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.25rem;
          color: #495057;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .scrollable-content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .item {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem;
          background: #f8f9fa;
          border-radius: 4px;
        }

        .item span {
          font-size: 0.875rem;
          color: #495057;
        }

        .indicators {
          display: flex;
          gap: 1rem;
        }

        .indicator {
          flex: 1;
          background: #fff;
          padding: 1.5rem;
          border-radius: 8px;
          text-align: center;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .indicator:hover {
          background: #f1f3f5;
        }

        .indicator h3 {
          margin: 0;
          font-size: 1.25rem;
          color: #495057;
        }

        .indicator p {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
          color: #3498db;
        }

        .dialog-content {
          padding: 1rem;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;