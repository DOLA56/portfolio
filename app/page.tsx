'use client';

import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import AssistantIA from './components/AssistantIA';


export default function MinimalModernPortfolio() {
	return (
		<div className="min-h-screen bg-black text-white">
			<HeroSection />
			<ProjectsSection />
			<SkillsSection />
			<ContactSection />
			<AssistantIA />
		</div>
	);
}
