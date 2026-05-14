import React from 'react';
import { Routes, Route } from 'react-router-dom';

// ALL NAMED IMPORTS
import { Dashboard } from './Dashboard';
import { AdminDashboard } from './AdminDashboard';
import { Profile } from './Profile';
import { AIStudio } from './AIStudio';
import { AISurfer } from './AISurfer';
import { PromptToolkit } from './PromptToolkit';
import { Blueprints } from './Blueprints';
import { CheckoutAI } from './CheckoutAI';
import { Automations } from './Automations';
import { Workflows } from './Workflows';
import { Members } from './Members';
import { MembersNotFound } from './MembersNotFound';

// If you haven't created these files yet, you can comment them out 
// to let the build pass, then add them back one by one.
import { MemberChat } from './MemberChat';
import { Vault } from './Vault';

export const MembersRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Members />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="admin" element={<AdminDashboard />} />
      <Route path="profile" element={<Profile />} />
      <Route path="ai-studio" element={<AIStudio />} />
      <Route path="ai-surfer" element={<AISurfer />} />
      <Route path="prompts" element={<PromptToolkit />} />
      <Route path="blueprints" element={<Blueprints />} />
      <Route path="checkout-ai" element={<CheckoutAI />} />
      <Route path="automations" element={<Automations />} />
      <Route path="workflows" element={<Workflows />} />
      <Route path="members" element={<Members />} />
      <Route path="chat" element={<MemberChat />} />
      <Route path="vault" element={<Vault />} />
      <Route path="*" element={<MembersNotFound />} />
    </Routes>
  );
};

export default MembersRouter;
