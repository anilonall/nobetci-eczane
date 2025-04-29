// API URL ve header bilgilerini düzenle
const apiUrl = 'https://api.collectapi.com/health/dutyPharmacy';
const apiKey = 'apikey 3GxqEz6svBx0jyWJXzF1IN:26aDYW5ov2g5oUBXHdflRH'; // Buraya gerçek API anahtarını koymalısın

// Eczaneleri almak için fonksiyon
function getEczaneler() {
  const city = document.getElementById('cityInput').value; // İl bilgisi
  const district = document.getElementById('districtInput').value; // İlçe bilgisi
  
  // Loading durumu ekleyelim
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '<p>Yükleniyor...</p>';

  // Eğer il veya ilçe boşsa, uyarı göster
  if (!city || !district) {
    alert("Lütfen il ve ilçe bilgisini girin.");
    resultDiv.innerHTML = ''; // Loading mesajını temizleyelim
    return;
  }

  // API'ye GET isteği yapalım
  fetch(`${apiUrl}?ilce=${district}&il=${city}`, {
    method: 'GET',
    headers: {
      'authorization': `apikey ${apiKey}`,
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())  // Yanıtı JSON formatında al
    .then(data => {
      if (data.result && data.result.length > 0) {
        displayResults(data.result);  // Veriyi işleyip göster
      } else {
        resultDiv.innerHTML = '<p>Bu bölge için nöbetçi eczane bulunamadı.</p>';
      }
    })
    .catch(error => {
      console.error("Bir hata oluştu:", error);
      alert("Eczaneler alınırken bir hata oluştu.");
      resultDiv.innerHTML = ''; // Hata mesajını temizleyelim
    });
}

// Eczane sonuçlarını ekranda gösteren fonksiyon
function displayResults(eczaneler) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = ''; // Önceki sonuçları temizle

  // Eczaneleri listele
  eczaneler.forEach(eczane => {
    const eczaneDiv = document.createElement('div');
    eczaneDiv.classList.add('eczane');
    
    // Eczane bilgilerini ekle
    eczaneDiv.innerHTML = `
      <p><strong>Adı:</strong> ${eczane.name}</p>
      <p><strong>Adres:</strong> ${eczane.address}</p>
      <p><strong>Telefon:</strong> <a href="tel:${eczane.phone}">${eczane.phone}</a></p>
    `;
    
    // Eczaneyi ekranda göster
    resultDiv.appendChild(eczaneDiv);
  });
}
