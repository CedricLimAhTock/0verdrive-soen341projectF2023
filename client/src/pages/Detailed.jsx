import React from 'react'
import DetailedCard from '../components/DetailedCard/DetailedCard'
import homeImg from '../assets/slideshow-template.jpg'

const Detailed = () => {
  const property = {
    images: [
      {
        original: "https://picsum.photos/id/1018/1000/600/",
      },
      {
        original: "https://picsum.photos/id/1015/1000/600/",
      },
      {
        original: "https://picsum.photos/id/1019/1000/600/",
      },
    ],
    title: "McGill is better than Concordia",
    price: "$1,000,000",
    address: "1234 Main St, San Diego, CA 92101",
    description: "A studio apartment in strategic location in Malang. Located nearby Univ Muhammadiyah Malang, Univ Negeri Malang and Univ Brawijaya, this is perfect for students and academics. This is in the main road to Batu, the main tourist attractions in East Java. So. it is well suited for tourists. This has a stunning Arjuno Mountain view with misty ambience in morning. It has kitchen, and cozy sofa and bunk bed & it caters up 3 guests. It has two pools, gyms, futsal field, minimarket and coffee shop.",
    broker: "Gina Cody",
    bedrooms: 3,
    bathrooms: 2,
    size: 2000,
  };

  return (
    <div>
        <DetailedCard property={property}/>
    </div>
  )
}

export default Detailed