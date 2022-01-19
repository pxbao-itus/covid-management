//line

convertArrayOfObjectsToCSV = args => {  
  const data = args.data;
  if (!data || !data.length) return;

  const columnDelimiter = args.columnDelimiter || ',';
  const lineDelimiter = args.lineDelimiter || '\n';

  const keys = Object.keys(data[0]);

  let result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.forEach(item => {
    ctr = 0;
    keys.forEach(key => {
      if (ctr > 0) result += columnDelimiter;
      result += item[key];
      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}
downloadCSV = async (args, dataArg) => {
  let csv = convertArrayOfObjectsToCSV({
    data: dataArg
  });
  if (!csv) return;
  const filename = args || 'export.csv';

  if (!csv.match(/^data:text\/csv/i)) {
    csv = 'data:text/csv;charset=utf-8,' + csv;
  }
  const data = encodeURI(csv);

  const link = document.createElement('a');
  link.setAttribute('href', data);
  link.setAttribute('download', filename);
  link.click();
}
async function loadAmount(){
  $('.type').removeClass('btn-success');
  $('#amount').addClass('btn-success');
  $('#statistic-title').text('Thống kê lượng người theo từng trạng thái');
  $('#chart').empty();
  $('#chart').removeClass('scale-in');
  $('#thead').empty();
  $('#tbody').empty();
  $('#chart').append(`
    <canvas id="amountChart"></canvas>
  `)
  let amountChart = document.getElementById("amountChart").getContext('2d');
  const amount = await $.get(`/manager/statistic/status-user`);
  let labels = [];
  let f0 = [];
  let f1 = [];
  let f2 = [];
  let f3 = [];
  let kb = [];
  let tv = [];
  let bt = [];
  for (const item of amount) {
    labels.push(item.ThoiGian);
    f0.push(item.F0);
    f1.push(item.F1);
    f2.push(item.F2);
    f3.push(item.F3);
    kb.push(item.KhoiBenh);
    bt.push(item.BinhThuong);
    tv.push(item.TuVong);
  }
  const myLineChart = new Chart(amountChart, {
    type: 'line',
    data: {
    labels: labels,
    datasets: [{
        label: "F0",
        data: f0,
        backgroundColor: [
          '#FF0000',
          ],
        borderColor: [
          '#FF0000',
          ],
        borderWidth: 2
      },
      {
        label: "F1",
        data: f1,
        backgroundColor: [
          '#ffa600',
          ],
        borderColor: [
          '#ffa600',
          ],
        borderWidth: 2
      },
      {
        label: "F2",
        data: f2,
        backgroundColor: [
          '#f95d6a',
          ],
        borderColor: [
          '#f95d6a',
          ],
        borderWidth: 2
      },
      {
        label: "F3",
        data: f3,
        backgroundColor: [
          '#3333FF',
          ],
        borderColor: [
          '#3333FF',
          ],
        borderWidth: 2
      },
      {
        label: "Khỏi bệnh",
        data: kb,
        backgroundColor: [
          '#00FF00',
          ],
        borderColor: [
          '#00FF00',
          ],
        borderWidth: 2
      },
      {
        label: "Bình thường",
        data: bt,
        backgroundColor: [
          '#00FFFF',
          ],
        borderColor: [
          '#00FFFF',
          ],
        borderWidth: 2
      },
      {
        label: "Tử vong",
        data: tv,
        backgroundColor: [
          '#003f5c',
          ],
        borderColor: [
          '#003f5c',
          ],
        borderWidth: 2
      },
    ]
    },
    options: {
    responsive: true
    }
  });
  $('#thead').append(`
    <tr>
        <th scope="col">Thời gian</th>
        <th scope="col">F0</th>
        <th scope="col">F1</th>
        <th scope="col">F2</th>
        <th scope="col">F3</th>
        <th scope="col">Khỏi bệnh</th>
        <th scope="col">Bình Thường</th>
        <th scope="col">Tử vong</th>
    </tr>
  `)
  for (const item of amount) {
    $('#tbody').append(`
      <tr>
        <td>${item.ThoiGian}</td>
        <td>${item.F0}</td>
        <td>${item.F1}</td>
        <td>${item.F2}</td>
        <td>${item.F3}</td>
        <td>${item.KhoiBenh}</td>
        <td>${item.BinhThuong}</td>
        <td>${item.TuVong}</td>
      </tr>
    `)
  }
  $('#export').click(function(){
    if($('#amount').hasClass('btn-success')) {
      downloadCSV('Trạng thái người liên quan', amount);
    }
  })
  return myLineChart;  
  
}


async function loadConsumPackage(){
  $('.type').removeClass('btn-success');
  $('#consum-pack').addClass('btn-success');
  $('#statistic-title').text('Thống kê tiêu thụ gói nhu yếu phẩm');
  $('#chart').empty();
  $('#chart').addClass('scale-in');
  $('#thead').empty();
  $('#tbody').empty();
  $('#chart').append(`
    <canvas id="consum-pack-chart"></canvas>
  `)
  let consumPackageChart = document.getElementById("consum-pack-chart").getContext('2d');
  const consumPackage = await $.get(`/manager/statistic/consum-package`);
  let labels = [];
  let data = [];

  for (const item of consumPackage) {
    labels.push(item.TenGoiNYP);
    data.push(item.SoLuong);
  }
  const myPieChart = new Chart(consumPackageChart, {
    type: 'pie',
    data: {
    labels: labels,
    datasets: [{
    data: data,
    backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360", '#FF0000', '#ffa600', '#f95d6a', '#3333FF', '#00FF00', '#00FFFF', '#003f5c'],
    hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774", '#FF0033', '#ffa633', '#f95daa', '#3333aa', '#00FF33', '#00FFaa', '#003faa']
    }]
    },
    options: {
    responsive: true
    }
    });
  $('#thead').append(`
    <tr>
        <th scope="col">Mã gói nhu yếu phẩm</th>
        <th scope="col">Tên gói nhu yếu phẩm</th>
        <th scope="col">Số lượng tiêu thụ</th>
    </tr>
  `)
  for (const item of consumPackage) {
    $('#tbody').append(`
      <tr>
        <td>${item.MaGoiNYP}</td>
        <td>${item.TenGoiNYP}</td>
        <td>${item.SoLuong}</td>
      </tr>
    `)
  }
  $('#export').click(function(){
    if($('#consum-pack').hasClass('btn-success')) {
      downloadCSV('Tiêu thụ gói nhu yếu phẩm', consumPackage);
    }
  })
    return myPieChart;
}

async function loadConsumProduct(){
  $('.type').removeClass('btn-success');
  $('#consum-pro').addClass('btn-success');
  $('#statistic-title').text('Thống kê tiêu thụ nhu yếu phẩm');
  $('#chart').empty();
  $('#chart').removeClass('scale-in');
  $('#chart').addClass('scale-in');
  $('#thead').empty();
  $('#tbody').empty();
  $('#chart').append(`
    <canvas id="consum-pro-chart"></canvas>
  `)
  let consumProductChart = document.getElementById("consum-pro-chart").getContext('2d');
  const consumProduct = await $.get(`/manager/statistic/product`);
  let labels = [];
  let data = [];

  for (const item of consumProduct) {
    labels.push(item.TenNYP);
    data.push(item.Tong);
  }
  const myPieChart = new Chart(consumProductChart, {
    type: 'pie',
    data: {
    labels: labels,
    datasets: [{
    data: data,
    backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360", '#FF0000', '#ffa600', '#f95d6a', '#3333FF', '#00FF00', '#00FFFF', '#003f5c'],
    hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774", '#FF0033', '#ffa633', '#f95daa', '#3333aa', '#00FF33', '#00FFaa', '#003faa']
    }]
    },
    options: {
    responsive: true
    }
    });
  $('#thead').append(`
    <tr>
        <th scope="col">Mã nhu yếu phẩm</th>
        <th scope="col">Tên nhu yếu phẩm</th>
        <th scope="col">Số lần tiêu thụ</th>
        <th scope="col">Tổng lượng tiêu thụ</th>
    </tr>
  `)
  for (const item of consumProduct) {
    $('#tbody').append(`
      <tr>
        <td>${item.MaNYP}</td>
        <td>${item.TenNYP}</td>
        <td>${item.SoLuong}</td>
        <td>${item.Tong}</td>
      </tr>
    `)
  }
  $('#export').click(function(){
    if($('#consum-pro').hasClass('btn-success')) {
      downloadCSV('Tiêu thụ nhu yếu phẩm', consumProduct);
    }
  })
    return myPieChart;
}

async function loadLoanPayment(){
  $('.type').removeClass('btn-success');
  $('#loan-payment').addClass('btn-success');
  $('#statistic-title').text('Thống kê thanh toán, dư nợ');
  $('#chart').empty();
  $('#chart').removeClass('scale-in');
  $('#thead').empty();
  $('#tbody').empty();
  $('#chart').append(`
    <canvas id="payment-chart"></canvas>
  `)
  let paymentChart = document.getElementById("payment-chart").getContext('2d');
  const payments = await $.get(`/manager/statistic/loan-payment`);
  let labels = [];
  let loan = [];
  let payment = [];
  for (const item of payments) {
    labels.push(item.ThoiGian);
    loan.push(item.DuNo);
    payment.push(item.ThanhToan);
  }
  const myLineChart = new Chart(paymentChart, {
    type: 'line',
    data: {
    labels: labels,
    datasets: [{
        label: "Dư nợ",
        data: loan,
        backgroundColor: [
          '#FF0000',
          ],
        borderColor: [
          '#FF0000',
          ],
        borderWidth: 2
      },
      {
        label: 'Thanh toán',
        data: payment,
        backgroundColor: [
          '#3333FF',
          ],
        borderColor: [
          '#3333FF',
          ],
        borderWidth: 2
      },    
    ]
    },
    options: {
    responsive: true
    }
  });
  $('#thead').append(`
    <tr>
        <th scope="col">Thời gian</th>
        <th scope="col">Thanh toán</th>
        <th scope="col">Dư nợ</th>
    </tr>
  `)
  for (const item of payments) {
    $('#tbody').append(`
      <tr>
        <td>${item.ThoiGian}</td>
        <td>${item.ThanhToan}</td>
        <td>${item.DuNo}</td>
      </tr>
    `)
  }
  $('#export').click(function(){
    if($('#loan-payment').hasClass('btn-success')) {
      downloadCSV('Thanh toán, dư nợ', payments);
    }
  })
  return myLineChart;  
}
$(document).ready(function() {
  loadAmount();
  $('#amount').click(function(){
    loadAmount();
  })
  $('#consum-pack').click(function(){
    loadConsumPackage();
  })
  $('#consum-pro').click(function(){
    loadConsumProduct();
  })
  $('#loan-payment').click(function(){
    loadLoanPayment();
  })

})