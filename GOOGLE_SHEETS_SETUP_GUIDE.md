# 📊 HealthTravo - Private Google Sheets Form Integration Guide
**Account**: `dushyanttchauhan@gmail.com`

---

## ❓ पिछला डेटा Google Sheet में क्यों नहीं आया? (Why didn't data arrive earlier?)

जब आपने वेबसाइट पर फॉर्म भरकर सबमिट किया, तो वेबसाइट ने सबमिशन स्वीकार कर लिया और सक्सेस स्क्रीन दिखाई (जिसमें **Open in WhatsApp Now** और **Submit Another Request** बटन दिखे)।

लेकिन डेटा आपकी Google Sheet में इसलिए नहीं पहुंचा, क्योंकि:
> Google की प्राइवेसी पॉलिसी के अनुसार, जब तक आप अपने Google खाते (`dushyanttchauhan@gmail.com`) से Apps Script को **Web app के रूप में Deploy** करके उसका URL वेबसाइट में नहीं जोड़ते, तब तक कोई भी वेबसाइट आपके निजी Google खाते में सीधे डेटा नहीं भेज सकती।

जैसे ही आप नीचे दिए गए **3 मिनट के आसान स्टेप्स** फॉलो करके Web App URL जोड़ेंगे, हर नया फॉर्म सबमिशन तुरंत आपकी Google Sheet और आपकी ईमेल ID पर आने लगेगा!

---

## 🔒 आपकी Google Sheet में क्या-क्या बनेगा?

`google-apps-script/Code.gs` में हमने आपके लिए सब कुछ ऑटोमैटिक तैयार कर दिया है:

1. **`All_Inquiries_SideBySide` (मुख्य स्क्रीन - दोनों एक साथ)**:
   - **बाईं तरफ (Left Side - नीले रंग में)**: मरीजों के **Clinical Consultation** का पूरा डेटा (नाम, फोन, देश, हॉस्पिटल, स्पेशलिटी, बीमारी की हिस्ट्री)।
   - **बीच में**: स्पष्ट डिवाइडर (`|`)।
   - **दाईं तरफ (Right Side - नेवी रंग में)**: **HealthTravo Media & Podcast** का पूरा डेटा (स्पीकर नाम, पद, संस्था, टॉपिक, फिल्‍मिंग मोड)।
2. **`Consultations`**: केवल क्लिनिकल कंसल्टेशन की समर्पित शीट।
3. **`HealthTravo_Media`**: केवल मीडिया और पॉडकास्ट की समर्पित शीट।
4. **📧 इंस्टेंट ईमेल अलर्ट**: हर सबमिशन पर तुरंत `dushyanttchauhan@gmail.com` पर मरीज/स्पीकर की पूरी डिटेल के साथ ईमेल भी आएगा!

---

## 🚀 3 मिनट का सेटअप (5 आसान स्टेप्स)

### स्टेप 1: `dushyanttchauhan@gmail.com` से Google Sheet बनाएं
1. ब्राउज़र में [sheets.google.com](https://sheets.google.com) खोलें (चेक कर लें कि आप `dushyanttchauhan@gmail.com` से लॉग इन हैं)।
2. **Blank spreadsheet (+)** पर क्लिक करें।
3. शीट का नाम ऊपर रख दें: **`HealthTravo Inquiries`**।

---

### स्टेप 2: Apps Script एडिटर खोलें
1. शीट के टॉप मेनू में **Extensions** (या विस्तार) पर क्लिक करें।
2. **Apps Script** पर क्लिक करें।
3. जो कोड एडिटर खुलेगा, उसमें पहले से लिखा डिफ़ॉल्ट कोड (`function myFunction() {...}`) पूरा मिटा दें (Ctrl+A दबाकर Delete)।

---

### स्टेप 3: `Code.gs` का कोड पेस्ट करें
1. अपने प्रोजेक्ट में मौजूद [`google-apps-script/Code.gs`](file:///d:/DEVYANHU/New%20Project/google-apps-script/Code.gs) फाइल का पूरा कोड कॉपी करें।
2. Apps Script एडिटर में पेस्ट करें।
3. ऊपर **Save (💾 फ्लॉपी डिस्क आइकॉन)** पर क्लिक करें।

---

### स्टेप 4: Deploy Web App (वेब ऐप डिप्लॉय करें)
1. ऊपर दाईं ओर नीले बटन **Deploy** पर क्लिक करें और **New deployment** चुनें।
2. बाईं तरफ गियर आइकॉन (⚙️) पर क्लिक करके **Web app** चुनें।
3. सेटिंग्स इस प्रकार रखें:
   - **Description**: `HealthTravo Secure Form Receiver`
   - **Execute as**: **`Me (dushyanttchauhan@gmail.com)`** *(महत्वपूर्ण)*
   - **Who has access**: **`Anyone`** *(महत्वपूर्ण - ताकि वेबसाइट फॉर्म डेटा भेज सके, लेकिन आपकी शीट केवल आपके पास 100% प्राइवेट रहेगी)*
4. नीले बटन **Deploy** पर क्लिक करें।
5. पहली बार यह **Authorize Access** मांगेगा:
   - अपना Google Account (`dushyanttchauhan@gmail.com`) चुनें।
   - यदि *"Google hasn’t verified this app"* स्क्रीन आए, तो नीचे **Advanced** पर क्लिक करें और **Go to Untitled project (unsafe)** पर क्लिक करें।
   - **Allow** पर क्लिक करें।
6. अब स्क्रीन पर आपको **Web app URL** दिखाई देगा:
   - उदाहरण: `https://script.google.com/macros/s/AKfycbx.../exec`
   - इस URL को **Copy** कर लें।

---

### स्टेप 5: वेबसाइट में URL जोड़ें
1. प्रोजेक्ट की फाइल [`src/components/ContactPage.jsx`](file:///d:/DEVYANHU/New%20Project/src/components/ContactPage.jsx#L35) खोलें।
2. लाइन 35 पर अपना कॉपी किया हुआ URL पेस्ट कर दें:
   ```javascript
   const GOOGLE_SHEET_WEBAPP_URL = "https://script.google.com/macros/s/YOUR_COPIED_ID_HERE/exec";
   ```
   *(या आप चैट में वह URL मुझे भी भेज सकते हैं, मैं तुरंत फाइल में सेट कर दूंगा)*
3. फाइल सेव करें।

---

## 🧪 सत्यापन (Testing)
1. वेबसाइट पर जाएं और कोई भी टेस्ट फॉर्म भरें।
2. सबमिट करते ही:
   - आपकी Google Sheet में `All_Inquiries_SideBySide` टैब बन जाएगा और डेटा आ जाएगा!
   - साथ ही `dushyanttchauhan@gmail.com` पर तुरंत नोटिफिकेशन ईमेल पहुंच जाएगा!
