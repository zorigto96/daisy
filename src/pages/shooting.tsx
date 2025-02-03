import dynamic from 'next/dynamic';

const Game = dynamic(
  () => import('../components/TargetShootingGame'),
  { ssr: false }
);

export default function Home() {
  return <Game />;
}