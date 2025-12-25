document.getElementById('findBtn').addEventListener('click', function() {
    const status = document.getElementById('status');
    const button = document.getElementById('findBtn');

    // إعدادات البحث
    status.style.color = "#2d3436";
    status.textContent = "جاري طلب إذن الوصول لموقعك...";
    button.disabled = true;
    button.style.opacity = "0.7";

    // التأكد من دعم المتصفح لتحديد الموقع
    if (!navigator.geolocation) {
        status.textContent = "عذراً، متصفحك لا يدعم خاصية تحديد الموقع.";
        status.style.color = "#d63031";
        button.disabled = false;
        button.style.opacity = "1";
        return;
    }

    // طلب الإحداثيات
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            status.style.color = "#00b894";
            status.textContent = "تم تحديد الموقع بنجاح، جاري فتح الخريطة...";

            // بناء رابط خرائط جوجل للبحث عن المساجد القريبة
            // q=mosque للبحث عن مساجد
            // z=15 لمستوى التكبير (Zoom)
            const googleMapsUrl = `https://www.google.com/maps/search/mosque/@${lat},${lng},15z`;

            // الانتقال للرابط بعد ثانية واحدة
            setTimeout(() => {
                window.location.href = googleMapsUrl;
            }, 1000);
        },
        (error) => {
            button.disabled = false;
            button.style.opacity = "1";
            status.style.color = "#d63031";

            switch(error.code) {
                case error.PERMISSION_DENIED:
                    status.textContent = "يجب السماح بالوصول للموقع لتتمكن من استخدام الخدمة.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    status.textContent = "تعذر تحديد موقعك الحالي، حاول مرة أخرى.";
                    break;
                case error.TIMEOUT:
                    status.textContent = "انتهت مهلة طلب الموقع، تأكد من جودة الإنترنت.";
                    break;
                default:
                    status.textContent = "حدث خطأ غير متوقع.";
                    break;
            }
        },
        {
            enableHighAccuracy: true,
            timeout: 8000,
            maximumAge: 0
        }
    );
});
