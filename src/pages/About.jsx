import React from 'react';
import { FiCheckCircle, FiUsers, FiTarget, FiAward, FiGlobe } from 'react-icons/fi';

const About = () => {
  const teamMembers = [
    { name: 'Pauzul Kim', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
    { name: 'ulumulu', role: 'CTO', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200' },
    { name: 'Jeong Un Kim', role: 'Lead Developer', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200' },
    { name: 'muhamad kim', role: 'UX Designer', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200' },
  ];

  const values = [
    { icon: <FiCheckCircle />, title: 'Integritas', description: 'Selalu jujur dan transparan dalam setiap transaksi' },
    { icon: <FiUsers />, title: 'Kolaborasi', description: 'Bekerja sama untuk mencapai hasil terbaik' },
    { icon: <FiTarget />, title: 'Inovasi', description: 'Terus berinovasi untuk meningkatkan layanan' },
    { icon: <FiAward />, title: 'Kualitas', description: 'Komitmen terhadap kualitas produk dan layanan' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-success text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Tentang Tmart
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Platform e-commerce terpercaya yang menghubungkan pembeli dan penjual dengan pengalaman berbelanja terbaik.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-secondary mb-6">
              Kisah Kami
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Didirikan pada tahun 2024, Tmart lahir dari visi untuk menciptakan platform e-commerce yang mudah digunakan, aman, dan dapat diandalkan oleh semua orang di Indonesia.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Kami percaya bahwa teknologi harus membuat hidup lebih mudah. Dengan komitmen untuk terus berinovasi, kami menghadirkan pengalaman berbelanja online yang menyenangkan dan efisien.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Hingga saat ini, kami telah melayani ribuan pelanggan setia dan terus berkembang untuk menjadi pilihan utama dalam berbelanja online.
            </p>
          </div>
          <div className="lg:w-1/2">
            <div className="bg-gradient-to-br from-primary to-success h-96 rounded-2xl flex items-center justify-center">
              <FiGlobe className="text-white" size={120} />
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="bg-accent py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary text-center mb-12">
            Nilai-Nilai Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 text-center">
                <div className="text-primary text-3xl mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-secondary text-center mb-12">
          Tim Kami
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-1">
                {member.name}
              </h3>
              <p className="text-primary font-medium">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-gray-200">Produk Tersedia</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-gray-200">Pelanggan Setia</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-gray-200">Kepuasan Pelanggan</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-gray-200">Layanan Pelanggan</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-secondary mb-6">
          Mulai Berbelanja dengan Tmart
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Bergabunglah dengan komunitas kami dan temukan pengalaman berbelanja online terbaik.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/products"
            className="btn-primary px-8 py-3"
          >
            Belanja Sekarang
          </a>
          <a
            href="/contact"
            className="btn-secondary px-8 py-3"
          >
            Hubungi Kami
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;