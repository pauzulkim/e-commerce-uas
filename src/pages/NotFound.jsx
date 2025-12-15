import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiSearch } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center p-8">
        <div className="text-9xl font-bold text-primary mb-4">404</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-gray-600 mb-8">
          Maaf, halaman yang Anda cari tidak ditemukan. Halaman mungkin telah dipindahkan atau dihapus.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="btn-primary flex items-center justify-center"
          >
            <FiHome className="mr-2" />
            Kembali ke Beranda
          </Link>
          <Link
            to="/products"
            className="btn-secondary flex items-center justify-center"
          >
            <FiSearch className="mr-2" />
            Jelajahi Produk
          </Link>
        </div>
        
        <div className="mt-12 p-6 bg-white rounded-xl shadow-sm border border-accent">
          <h3 className="font-semibold text-gray-700 mb-3">
            Tips Pencarian:
          </h3>
          <ul className="text-left text-gray-600 space-y-2">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></div>
              <span>Periksa kembali URL yang dimasukkan</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></div>
              <span>Gunakan fitur pencarian di header</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></div>
              <span>Jelajahi kategori produk yang tersedia</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;