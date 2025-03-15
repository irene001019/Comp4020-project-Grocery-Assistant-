import React, { useState, useEffect, useMemo } from 'react';
import { 
  Typography, Paper, Box, Tab, Tabs, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Button
} from '@mui/material';
import { 
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const sx = {
  hideScrollbar: { overflowX: 'auto', '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' },
  btn: (active) => ({ borderRadius: '24px', minWidth: '80px', boxShadow: active ? 1 : 0 }),
  backBtn: { mb: 2, borderRadius: '24px', display: 'flex', alignItems: 'center' },
  chart: { height: 300, mt: 2 },
  buttonGroup: { 
    display: 'flex', 
    bgcolor: '#f5f5f5', 
    borderRadius: '28px',
    p: '4px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  }
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#4CAF50', '#9C27B0'];

const Analytics = () => {
  const [tab, setTab] = useState(0);
  const [category, setCategory] = useState(null);
  const [timeRange, setTimeRange] = useState('weekly');
  const [data, setData] = useState({ items: [], wasteItems: [] });

  useEffect(() => {
    setData({
      items: JSON.parse(localStorage.getItem('storageItems') || '[]'),
      wasteItems: JSON.parse(localStorage.getItem('wasteItems') || '[]')
    });
  }, []);

  const processData = (filterWasteOnly = false) => {
    const map = new Map();
    const filteredItems = filterWasteOnly ? data.wasteItems : [...data.items, ...data.wasteItems];
    
    filteredItems.forEach(item => {
      const key = category ? item.name : item.category;
      if (category && item.category !== category) return;
      
      const price = parseFloat(item.price.replace('$', '')) || 0;
      map.set(key, (map.get(key) || 0) + (price ));
    });
    
    return Array.from(map, ([name, value]) => ({ name, value }));
  };

  const chartData = useMemo(() => ({
    spending: processData(),
    waste: processData(true),
    details: category ? processData() : []
  }), [data, category]);

  const totals = {
    spending: chartData.spending.reduce((sum, item) => sum + item.value, 0),
    waste: chartData.waste.reduce((sum, item) => sum + item.value, 0)
  };
  
  const Chart = ({ data }) => (
    <Box sx={{ ...sx.chart, ...sx.hideScrollbar }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            dataKey="value"
            nameKey="name"
            onClick={(data) => !category && setCategory(data.name)}
          >
            {data.map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );

  const DataTable = ({ data }) => (
    <TableContainer component={Paper} sx={{ mt: 2, ...sx.hideScrollbar }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{category ? 'Item' : 'Category'}</TableCell>
            <TableCell align="right">Amount ($)</TableCell>
            <TableCell align="right">Percentage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => {
            const total = tab === 0 ? totals.waste : totals.spending;
            const percentage = total ? ((item.value / total) * 100).toFixed(2) : 0;
            
            return (
              <TableRow key={item.name} hover onClick={() => !category && setCategory(item.name)}>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">${item.value.toFixed(2)}</TableCell>
                <TableCell align="right">{percentage}%</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderContent = () => {
    const currentData = tab === 0 ? chartData.waste : chartData.spending;
    const totalValue = tab === 0 ? totals.waste : totals.spending;
    const totalLabel = tab === 0 ? 'Total Food Waste' : 'Total Spending';
    
    return (
      <>
        {category ? (
          <>
            <Button variant="outlined" onClick={() => setCategory(null)} sx={sx.backBtn}>
              <Box component="span" sx={{ mr: 1 }}>←</Box> Category View
            </Button>
            
            <Typography variant="h6">{category} Details</Typography>
            <DataTable data={chartData.details} />
          </>
        ) : (
          <>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                {totalLabel}: ${totalValue.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Click on a category in the chart for details
              </Typography>
            </Paper>
            
            <Chart data={currentData} />
            <DataTable data={currentData} />
          </>
        )}
      </>
    );
  };

  return (
    <Box sx={{ p: 2, ...sx.hideScrollbar }}>
      <Typography variant="h4" gutterBottom>Analytics</Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" color="primary">
          Spending Analysis : 
        </Typography>

        <Box sx={sx.buttonGroup}>
          <Button 
            onClick={() => setTimeRange('weekly')} 
            variant={timeRange === 'weekly' ? 'contained' : 'text'}
            sx={sx.btn(timeRange === 'weekly')}
          >
            Week
          </Button>
          <Button 
            onClick={() => setTimeRange('monthly')} 
            variant={timeRange === 'monthly' ? 'contained' : 'text'}
            sx={sx.btn(timeRange === 'monthly')}
          >
            Month
          </Button>
        </Box>
      </Box>
      
      <Tabs value={tab} onChange={(_, value) => setTab(value)} sx={{ mb: 2 }}>
        <Tab label="Food Waste" />
        <Tab label="Budget" />
      </Tabs>
      {renderContent()}
    </Box>
  );
};

export default Analytics;