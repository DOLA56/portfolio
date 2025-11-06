'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    id: 1,
    title: 'FlexDesk',
    description:
      'Système connecté pour la gestion intelligente d’un bureau : chauffage, volets Bluetooth, affichage pédagogique. Capteurs environnementaux + API .NET + base de données cloud.',
    image: '/flexdesk.png',
    githubLink: 'https://github.com/DOLA56/FlexDesk',
    pdfLink: '/flexdesk.pdf',
  },
  {
    id: 2,
    title: 'Site restaurant',
    description: 'Site responsive en HTML/CSS/JS avec système de réservation',
    image: '/siterestaurant.png',
  },
  {
    id: 3,
    title: 'DVWA / Root-Me',
    description: 'Tests de failles XSS, SQLi, CSRF sur plateformes d’entraînement',
    image: '/dvwa.png',
    viewLink: 'https://www.edgenexus.io/fr/dvwa/',
  },
];

export default function ProjectsSection() {
  return (
    <section className="py-12 md:py-20 px-4 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center"
      >
        Projets réalisés
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: project.id * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group relative aspect-video bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-xl overflow-hidden"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-4">
                {project.viewLink && (
                  <Link
                    href={project.viewLink}
                    target="_blank"
                    className="text-sm px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                  >
                    site internet
                  </Link>
                )}
                {project.githubLink && (
                  <Link
                    href={project.githubLink}
                    target="_blank"
                    className="text-sm px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                  >
                    GitHub
                  </Link>
                )}
                {project.pdfLink && (
                  <Link
                    href={project.pdfLink}
                    target="_blank"
                    className="text-sm px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                  >
                    Fiche projet
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
