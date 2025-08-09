// 간단한 className 합치기 유틸 (추가 패키지 필요 없음)
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
