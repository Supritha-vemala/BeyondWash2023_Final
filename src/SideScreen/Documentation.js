import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import Header from '../components/Header';

const PrivacyPolicyScreen = () => {
  const privacyPolicyText = `
  Privacy Policy

  Effective date: January 1, 2023

  Our Company ("us", "we", or "our") operates the http://www.example.com website (the "Service").

  This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.

  Information Collection and Use

  We collect several different types of information for various purposes to provide and improve our Service to you.

  Types of Data Collected

  Personal Data

  While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:

  - Email address
  - First name and last name
  - Phone number
  - Address, State, Province, ZIP/Postal code, City
  - Cookies and Usage Data

  Usage Data

  We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g., IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers, and other diagnostic data.

  Tracking & Cookies Data

  We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.

  Cookies are files with a small amount of data that may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.

  Examples of Cookies we use:

  - Session Cookies: We use Session Cookies to operate our Service.
  - Preference Cookies: We use Preference Cookies to remember your preferences and various settings.
  - Security Cookies: We use Security Cookies for security purposes.

  Use of Data

  Our Company uses the collected data for various purposes:

  - To provide and maintain the Service
  - To notify you about changes to our Service
  - To allow you to participate in interactive features of our Service when you choose to do so
  - To provide customer care and support
  - To provide analysis or valuable information so that we can improve the Service
  - To monitor the usage of the Service
  - To detect, prevent and address technical issues

  Transfer of Data

  Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.

  If you are located outside the United States and choose to provide information to us, please note that we transfer the data, including Personal Data, to the United States and process it there.

  Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.

  Our Company will take all the steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.

  Disclosure of Data

  Legal Requirements

  Our Company may disclose your Personal Data in the good faith belief that such action is necessary to:

  - To comply with a legal obligation
  - To protect and defend the rights or property of Our Company
  - To prevent or investigate possible wrongdoing in connection with the Service
  - To protect the personal safety of users of the Service or the public
  - To protect against legal liability

  Security of Data

  The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.

  Service Providers

  We may employ third party companies and individuals to facilitate our Service ("Service Providers"), provide the Service on our behalf, perform Service-related services, or assist us in analyzing how our Service is used.

  These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.

  Links to Other Sites

  Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.

  We have no control over and assume no responsibility for the content, privacy policies, or practices of any third party sites or services.

  Changes to This Privacy Policy

  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.

  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.

  Contact Us

  If you have any questions about this Privacy Policy, please contact us:

  By email: privacy@example.com
  By visiting this page on our website: http://www.example.com/contact
  `;

  return (
    <View style={styles.container}>
      <Header headerText={'Policy'} />
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.privacyText}>{privacyPolicyText}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  content: {
    paddingBottom: 10,
  },
  privacyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000',
    fontStyle: 'italic',
  },
});

export default PrivacyPolicyScreen;
