/**
 * Created by waylau.com on 2015-1-28.
 */

$('#dg').datagrid({
    url:'data/datagrid_data1.json',
    columns:[[
        {field:'productid',title:'Productid',width:100},
        {field:'productname',title:'Productname',width:100},
        {field:'unitcost',title:'Unitcost',width:100,align:'right'}
    ]]
});