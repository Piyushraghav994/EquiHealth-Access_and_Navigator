/**
 * Indian States and Districts Data
 * Designed with a clean interface so an external REST API or GeoService
 * can be plugged in seamlessly in the future.
 */

export interface LocationState {
  code: string;
  name: string;
  districts: string[];
}

export const INDIAN_STATES: LocationState[] = [
  {
    code: 'RJ',
    name: 'Rajasthan',
    districts: [
      'Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner', 'Alwar',
      'Bharatpur', 'Bhilwara', 'Sikar', 'Pali', 'Nagaur', 'Jhunjhunu', 'Churu'
    ]
  },
  {
    code: 'MH',
    name: 'Maharashtra',
    districts: [
      'Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad', 'Solapur',
      'Kolhapur', 'Amravati', 'Nanded', 'Satara', 'Ahmednagar', 'Jalgaon'
    ]
  },
  {
    code: 'UP',
    name: 'Uttar Pradesh',
    districts: [
      'Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Prayagraj', 'Ghaziabad',
      'Noida / Gautam Buddha Nagar', 'Meerut', 'Aligarh', 'Bareilly', 'Gorakhpur', 'Mathura'
    ]
  },
  {
    code: 'DL',
    name: 'Delhi (NCT)',
    districts: [
      'Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi',
      'North East Delhi', 'North West Delhi', 'South Delhi', 'South West Delhi', 'West Delhi'
    ]
  },
  {
    code: 'KA',
    name: 'Karnataka',
    districts: [
      'Bengaluru Urban', 'Bengaluru Rural', 'Mysuru', 'Hubballi-Dharwad',
      'Mangaluru', 'Belagavi', 'Kalaburagi', 'Ballari', 'Shivamogga', 'Tumakuru'
    ]
  },
  {
    code: 'TN',
    name: 'Tamil Nadu',
    districts: [
      'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem',
      'Tirunelveli', 'Erode', 'Vellore', 'Thanjavur', 'Dindigul'
    ]
  },
  {
    code: 'WB',
    name: 'West Bengal',
    districts: [
      'Kolkata', 'North 24 Parganas', 'South 24 Parganas', 'Howrah',
      'Hooghly', 'Darjeeling', 'Purba Medinipur', 'Paschim Bardhaman', 'Murshidabad'
    ]
  },
  {
    code: 'BR',
    name: 'Bihar',
    districts: [
      'Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia', 'Darbhanga',
      'Begusarai', 'Nalanda', 'Rohtas', 'Samastipur'
    ]
  },
  {
    code: 'MP',
    name: 'Madhya Pradesh',
    districts: [
      'Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Dewas', 'Satna', 'Ratlam'
    ]
  },
  {
    code: 'GJ',
    name: 'Gujarat',
    districts: [
      'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Gandhinagar', 'Junagadh'
    ]
  },
  {
    code: 'HR',
    name: 'Haryana',
    districts: [
      'Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Hisar', 'Karnal', 'Rohtak', 'Sonipat'
    ]
  },
  {
    code: 'PB',
    name: 'Punjab',
    districts: [
      'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali (SAS Nagar)', 'Hoshiarpur'
    ]
  },
  {
    code: 'TS',
    name: 'Telangana',
    districts: [
      'Hyderabad', 'Rangareddy', 'Medchal-Malkajgiri', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam'
    ]
  },
  {
    code: 'AP',
    name: 'Andhra Pradesh',
    districts: [
      'Visakhapatnam', 'Vijayawada (NTR)', 'Guntur', 'Tirupati', 'Kurnool', 'Nellore', 'Kakinada'
    ]
  },
  {
    code: 'KL',
    name: 'Kerala',
    districts: [
      'Thiruvananthapuram', 'Kochi (Ernakulam)', 'Kozhikode', 'Thrissur', 'Kollam', 'Palakkad', 'Kannur', 'Alappuzha'
    ]
  },
  {
    code: 'OD',
    name: 'Odisha',
    districts: [
      'Bhubaneswar (Khurda)', 'Cuttack', 'Rourkela (Sundargarh)', 'Puri', 'Sambalpur', 'Balasore', 'Ganjam'
    ]
  },
  {
    code: 'AS',
    name: 'Assam',
    districts: [
      'Guwahati (Kamrup Metro)', 'Dibrugarh', 'Silchar (Cachar)', 'Jorhat', 'Nagaon', 'Tezpur (Sonitpur)'
    ]
  },
  {
    code: 'JH',
    name: 'Jharkhand',
    districts: [
      'Ranchi', 'Jamshedpur (East Singhbhum)', 'Dhanbad', 'Bokaro', 'Deoghar', 'Hazaribagh'
    ]
  },
  {
    code: 'CH',
    name: 'Chhattisgarh',
    districts: [
      'Raipur', 'Bhilai (Durg)', 'Bilaspur', 'Korba', 'Rajnandgaon', 'Jagdalpur (Bastar)'
    ]
  },
  {
    code: 'UK',
    name: 'Uttarakhand',
    districts: [
      'Dehradun', 'Haridwar', 'Nainital', 'Udham Singh Nagar', 'Rishikesh', 'Almora'
    ]
  },
  {
    code: 'HP',
    name: 'Himachal Pradesh',
    districts: [
      'Shimla', 'Dharamshala (Kangra)', 'Mandi', 'Solan', 'Kullu', 'Hamirpur'
    ]
  },
  {
    code: 'GA',
    name: 'Goa',
    districts: [
      'North Goa', 'South Goa'
    ]
  },
  {
    code: 'OTHER',
    name: 'Other State / Union Territory',
    districts: [
      'Other District'
    ]
  }
];

export function getDistrictsForState(stateName: string): string[] {
  const match = INDIAN_STATES.find(s => s.name.toLowerCase() === stateName.toLowerCase());
  return match ? match.districts : [];
}
