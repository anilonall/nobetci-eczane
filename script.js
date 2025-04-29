
const apiUrl = 'https://api.collectapi.com/health/dutyPharmacy';
const apiKey = 'apikey 3GxqEz6svBx0jyWJXzF1IN:26aDYW5ov2g5oUBXHdflRH'; 


function getEczaneler() {
  const city = document.getElementById('cityInput').value;
  const district = document.getElementById('districtInput').value; 
  
  
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '<p>Yükleniyor...</p>';

  
  if (!city || !district) {
    alert("Lütfen il ve ilçe bilgisini girin.");
    resultDiv.innerHTML = ''; 
    return;
  }

  
  fetch(`${apiUrl}?ilce=${district}&il=${city}`, {
    method: 'GET',
    headers: {
      'authorization': `apikey ${apiKey}`,
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())  
    .then(data => {
      if (data.result && data.result.length > 0) {
        displayResults(data.result);  
      } else {
        resultDiv.innerHTML = '<p>Bu bölge için nöbetçi eczane bulunamadı.</p>';
      }
    })
    .catch(error => {
      console.error("Bir hata oluştu:", error);
      alert("Eczaneler alınırken bir hata oluştu.");
      resultDiv.innerHTML = ''; 
    });
}


function displayResults(eczaneler) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = ''; 

  
  eczaneler.forEach(eczane => {
    const eczaneDiv = document.createElement('div');
    eczaneDiv.classList.add('eczane');
    
    
    eczaneDiv.innerHTML = `
      <p><strong>Adı:</strong> ${eczane.name}</p>
      <p><strong>Adres:</strong> ${eczane.address}</p>
      <p><strong>Telefon:</strong> <a href="tel:${eczane.phone}">${eczane.phone}</a></p>
    `;
    
    
    resultDiv.appendChild(eczaneDiv);
  });
}
