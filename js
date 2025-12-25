document.addEventListener('DOMContentLoaded', () => {
    const findBtn = document.getElementById('findBtn');
    const status = document.getElementById('status');

    findBtn.onclick = function() {
        // تحديث حالة الزر
        status.textContent = "جاري طلب إذن الموقع...";
        status.style.color = "#0984e3";
        findBtn.disabled = true;
        findBtn.style.opacity = "0.8";

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    status.textContent = "تم التحديد، جاري فتح الخريطة...";
                    status.style.color = "#00b894";

                    // رابط بحث مباشر عن المساجد القريبة من إحداثيات المستخدم
                    const googleMapsUrl = `https://www.google.com/maps/search/mosque/@${lat},${lon},15z`;

                    // الانتقال الفوري
                    window.location.href = googleMapsUrl;
                },
                (error) => {
                    findBtn.disabled = false;
                    findBtn.style.opacity = "1";
                    status.style.color = "#d63031";
                    
                    if (error.code === 1) {
                        status.textContent = "يرجى السماح للموقع بالوصول لخدمات الـ GPS.";
                    } else {
                        status.textContent = "تعذر تحديد الموقع، جرب مرة أخرى.";
                    }
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        } else {
            status.textContent = "متصفحك لا يدعم تحديد الموقع.";
            status.style.color = "#d63031";
        }
    };
});
