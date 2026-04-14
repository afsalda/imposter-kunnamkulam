/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Splash from './pages/Splash';
import ModeSelect from './pages/ModeSelect';
import PassPlaySetup from './pages/setup/PassPlaySetup';
import GameRouter from './pages/game/GameRouter';
import Leaderboard from './pages/Leaderboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/mode" element={<ModeSelect />} />
        <Route path="/setup/passplay" element={<PassPlaySetup />} />
        <Route path="/game/*" element={<GameRouter />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
