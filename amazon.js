// import got from 'got';
import got from 'got';
import HTMLParser from 'node-html-parser';

//const productLink = 'https://www.amazon.com/-/es/Disco-duro-externo-port%C3%A1til-Seagate/dp/B07CRG94G3/ref=lp_16225007011_1_2?th=1';

async function Monitor (productLink) {
    const myHeadres = {
'authority': 'www.amazon.com',
'method': 'GET',
'path': '/-/es/Disco-duro-externo-port%C3%A1til-Seagate/dp/B07CRG94G3/ref=lp_16225007011_1_2?th=1',
'scheme': 'https',
'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
'accept-encoding': 'gzip, deflate, br',
'downlink': 10,
'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36',
'ect': '4g',
'referer': 'https://www.amazon.com/-/es/b?node=16225007011&pf_rd_r=C7NCNEMZXWQYP84ZQMBC&pf_rd_p=af9fd607-7c8d-4628-8c4c-f4e2c44f8d63&pd_rd_r=81a69c17-cefc-4a66-96a9-b1fef30e168c&pd_rd_w=EZUvC&pd_rd_wg=PyDkd&ref_=pd_gw_unk',
'rtt': 100,
'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
'sec-ch-ua-mobile': '?0',
'sec-ch-ua-platform': "Windows",
'sec-fetch-dest': 'document',
'sec-fetch-mode': 'navigate',
'sec-fetch-site': 'same-origin',
'sec-fetch-user': '?1',
'upgrade-insecure-requests': 1,
'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36',
    }
    const response = await got(productLink, {
        headers: myHeadres
    });
    if (response && response.statusCode === 200) {
        let root = HTMLParser.parse(response.body);
        let availabilityDiv = root.querySelector('#availability');
        if (availabilityDiv) {
            let productName = productLink.substring(productLink.indexOf('com/') + 4, productLink.indexOf('/dp'));
            let stockText = availabilityDiv.childNodes[1].innerText.toLowerCase().trim();
            if (stockText !== 'disponible.'){
                console.log('no hay stock')
            } else {
                console.log('hay stock')
            }

        }
    }
    await new Promise(r =>  setTimeout(r, 8000));
    Monitor(productLink);
    return false;
}

async function Run() {
    // const productLink = prompt("Ingrese el lind a monitorear: ");
    // if (productLink.indexOf('http') > 0) {
    //     console.log(productLink);
    // }
}

Run();