import { useBreakpoint } from '~/hooks/useBreakpoint';

/**
 * Hook xác định số lượng slides hiển thị tương ứng với kích thước màn hình
 * theo quy tắc responsive (chuẩn Bootstrap grid).
 *
 * @returns {{ slidesToShow: number, shouldUseSlider: boolean }}
 */
export const useSlidesToShow = (optionsLength = 0) => {
    const {  md, sm, xs } = useBreakpoint();

    let slidesToShow = 4; // Mặc định cho desktop (≥1200px)
    if (md) slidesToShow = 3; // Màn hình vừa (≥992px)
    if (sm) slidesToShow = 2; // Màn hình nhỏ (≥768px)
    if (xs) slidesToShow = 1; // Điện thoại (<576px)

    const shouldUseSlider = optionsLength > slidesToShow;

    return { slidesToShow, shouldUseSlider };
};
