import React, { useEffect } from 'react';
import { Player } from '../types';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, LogOut, Award, Flame } from 'lucide-react';

interface GameOverModalProps {
  isOpen: boolean;
  winner: Player | null;
  players: Player[];
  isHost: boolean;
  onRematch: () => void;
  onLeaveRoom: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  isOpen,
  winner,
  players,
  isHost,
  onRematch,
  onLeaveRoom,
}) => {
  useEffect(() => {
    if (isOpen) {
      // Fire festive confetti
      const end = Date.now() + 2.5 * 1000;
      const colors = ['#ff3838', '#ffaf40', '#32ff7e', '#18dcff', '#7d5fff'];

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors,
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }, [isOpen]);

  if (!isOpen || !winner) return null;

  return (
    <div
      id="game-over-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
    >
      <div className="bg-gradient-to-b from-[#252836] to-[#161824] border-2 border-amber-400/80 rounded-3xl p-6 max-w-md w-full text-center shadow-2xl relative overflow-hidden">
        {/* Ambient Winner Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Crown / Trophy icon */}
        <div className="relative inline-flex p-4 rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 shadow-xl mb-3 animate-bounce">
          <Trophy className="w-10 h-10" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-amber-300 mb-1">
          CHIẾN THẮNG!
        </h2>
        <p className="text-xs text-slate-300 mb-4">
          Chúc mừng người chơi đã đánh hết toàn bộ lá bài trên tay
        </p>

        {/* Winner Spotlight Card */}
        <div className="bg-slate-900/90 border-2 border-amber-400/60 rounded-2xl p-4 mb-4 flex items-center justify-center gap-3.5 shadow-lg">
          <div className="w-14 h-14 rounded-full border-2 border-amber-400 overflow-hidden bg-slate-950 flex items-center justify-center shadow-md">
            {winner.avatar ? (
              <img
                src={winner.avatar}
                alt={winner.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Award className="w-8 h-8 text-amber-400" />
            )}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="font-black text-lg text-slate-100">{winner.name}</span>
            </div>
            <div className="text-xs text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
              <Flame className="w-3.5 h-3.5 fill-current" />
              Đã đánh hết toàn bộ lá bài!
            </div>
          </div>
        </div>

        {/* Remaining Players Summary */}
        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800 text-left mb-5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Tổng kết người chơi:
          </span>
          <div className="space-y-1.5 max-h-32 overflow-y-auto">
            {players.map(p => {
              const cardCount = p.handCount ?? p.hand.length;
              return (
                <div
                  key={p.id}
                  className="flex items-center justify-between text-xs text-slate-300 py-1.5 px-2.5 rounded-lg bg-slate-900/50"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full overflow-hidden bg-slate-800">
                      {p.avatar ? (
                        <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" />
                      ) : null}
                    </div>
                    <span className="font-semibold">{p.name}</span>
                    {p.id === winner.id && (
                      <span className="text-[10px] bg-amber-400/20 text-amber-300 font-black px-1.5 py-0.2 rounded">
                        HẠNG 1 🏆
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">
                      {p.id === winner.id ? 'Hết bài' : `Còn ${cardCount} lá`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {isHost ? (
            <button
              onClick={onRematch}
              className="py-3 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black rounded-xl text-sm shadow-lg transition-transform hover:scale-102 active:scale-98 flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              Tái Đấu Ngay
            </button>
          ) : (
            <div className="py-3 bg-slate-800 text-slate-400 text-xs font-bold rounded-xl flex items-center justify-center text-center">
              Chờ chủ phòng tái đấu...
            </div>
          )}
          <button
            onClick={onLeaveRoom}
            className="py-3 bg-slate-800 hover:bg-slate-700 text-red-300 font-bold rounded-xl text-sm border border-slate-600 transition-colors flex items-center justify-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            Về Sảnh Chờ
          </button>
        </div>
      </div>
    </div>
  );
};
