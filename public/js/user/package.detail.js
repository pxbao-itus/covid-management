
let package;
let total = 0;

async function checkLevel(sum) {
    const loan = await $.get('/api/get-loan');
    const level = await $.get('/api/get-level');
    if((sum + parseInt(loan.SoDuNo)) <= parseInt(level.HanMuc)) {
        return true;
    } else {
        return false;
    }
}
window.onload = async () => {

    package = await (await fetch(`/api/package/detail?id=${window.location.href.slice(window.location.href.indexOf('=')+1)}`)).json();
    for (let item of package.details) {
        total+= item.DonGia * item.SoLuong;
        $(`#minus-${item.MaNYP}`).click(() => {
            if(parseInt($(`#${item.MaNYP}`).text()) > item.SoLuongToiThieu && parseInt($(`#${item.MaNYP}`).text()) <= item.SoLuongToiDa) {
                $(`#${item.MaNYP}`).text(parseInt($(`#${item.MaNYP}`).text()) - 1);
                item.SoLuong = parseInt($(`#${item.MaNYP}`).text());
                total-= item.DonGia;
                $('#total').text(`Tổng tiền: ${total} đồng`);
            }
        })
        $(`#plus-${item.MaNYP}`).click(() => {
            if(parseInt($(`#${item.MaNYP}`).text()) >= item.SoLuongToiThieu && parseInt($(`#${item.MaNYP}`).text()) < item.SoLuongToiDa) {
                $(`#${item.MaNYP}`).text(parseInt($(`#${item.MaNYP}`).text()) + 1);
                item.SoLuong = parseInt($(`#${item.MaNYP}`).text());
                total += item.DonGia
                $('#total').text(`Tổng tiền: ${total} đồng`);
            }
        })
    }
    $('#total').text(`Tổng tiền: ${total} đồng`);

    $('#buy').click((event) => {
        const loan = await $.get('/api/get-loan');
        const level = await $.get('/api/get-level');
        if((total + parseInt(loan.SoDuNo)) <= parseInt(level.HanMuc)) {
            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            package.package.ThoiGian = date + ' ' + time;
            package.package.SoTien = total;
            fetch('/order/buy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(package),
                })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            $(this).trigger('click');
        } else {
            event.preventDefault();
            alert("Vượt quá hạn mức tối thiểu");
            return false;
        }
        
    })

}

