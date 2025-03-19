import colour


class ColorConverter:
    """Classe utilitária para conversão de cores."""

    LUMINOSIDADE_CLARA = 0.5

    @staticmethod
    def hex_to_colour(hex_color: str) -> colour.Color:
        """Convert uma string HEX para um objeto Colour."""
        return colour.Color(hex_color)

    @staticmethod
    def colour_to_hex(col: colour.Color) -> str:
        """Convert um objeto Colour para uma string HEX."""
        return col.hex_l.upper()


class TextColorStrategy:
    """Interface para estratégia de cálculo de cor do texto."""

    def get_text_color(self, background_hex: str) -> str:
        """Retorna a cor do texto com base no fundo."""
        raise NotImplementedError

    def get_background_color(self, color_hex: str) -> str:
        """Retorna a cor de fundo com base na cor."""
        raise NotImplementedError


class ContrastTextColorStrategy(TextColorStrategy):
    """Estratégia para ajustar a cor do texto com base no fundo."""

    def get_text_color(self, color_hex: str) -> str:
        """Abaixa o brilho da cor para melhor contraste."""
        bg_color = ColorConverter.hex_to_colour(color_hex)
        brilho = self.get_brilho(bg_color)

        eh_claro = brilho > ColorConverter.LUMINOSIDADE_CLARA

        novo_brilho = brilho if eh_claro else 0.9  # aumenta brilho para 90%
        bg_color.luminance = novo_brilho

        return ColorConverter.colour_to_hex(bg_color)

    def get_background_color(self, color_hex: str) -> str:
        """Aumenta o brilho da cor para melhor contraste."""
        bg_color = ColorConverter.hex_to_colour(color_hex)
        brilho = self.get_brilho(bg_color)

        eh_claro = brilho > ColorConverter.LUMINOSIDADE_CLARA

        novo_brilho = 0.20 if eh_claro else brilho  # diminui brilho para 20%
        bg_color.luminance = novo_brilho

        return ColorConverter.colour_to_hex(bg_color)

    def get_brilho(self, color: colour.Color) -> float:
        """Retorna o brilho da cor."""
        return 0.2126 * color.red + 0.7152 * color.green + 0.0722 * color.blue


class ColorManager:
    """Gerenciador de cores que aplica a estratégia definida."""

    def __init__(self, strategy: TextColorStrategy) -> None:
        """Inicializa o gerenciador de cores com a estratégia definida."""
        self.strategy = strategy

    def get_text_color(self, background_hex: str) -> str:
        """Retorna a cor do texto com base no fundo."""
        return self.strategy.get_text_color(background_hex)

    def get_background_color(self, color_hex: str) -> str:
        """Retorna a cor de fundo com base na cor."""
        return self.strategy.get_background_color(color_hex)
