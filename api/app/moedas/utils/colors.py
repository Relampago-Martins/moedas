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
        return col.get_hex_l().upper()


class ColorStartegy:
    """Interface para estratégia de cálculo de cor do texto."""

    def get_text_color(self, background_hex: str) -> str:
        """Retorna a cor do texto com base no fundo."""
        raise NotImplementedError

    def get_background_color(self, color_hex: str) -> str:
        """Retorna a cor de fundo com base na cor."""
        raise NotImplementedError


class ContrastColorStrategy(ColorStartegy):
    """Estratégia para ajustar a cor do texto com base no fundo."""

    def get_background_color(self, color_hex: str) -> str:
        """Aumenta o brilho da cor para melhor contraste com o fundo."""
        bg_color = ColorConverter.hex_to_colour(color_hex)

        bg_color.luminance = 0.9

        return ColorConverter.colour_to_hex(bg_color)

    def get_text_color(self, color_hex: str) -> str:
        """Diminui o brilho da cor para melhor contraste."""
        bg_color = ColorConverter.hex_to_colour(color_hex)

        # diminui brilho para 20%
        eh_claro = self.get_brilho(bg_color) > ColorConverter.LUMINOSIDADE_CLARA
        novo_brilho = 0.44 if eh_claro else bg_color.luminance
        bg_color.luminance = novo_brilho

        return ColorConverter.colour_to_hex(bg_color)

    def get_brilho(self, color: colour.Color) -> float:
        """Retorna o brilho baseado na cor.

        É diferente da luminosidade, pois considera a percepção humana.
        Dessa forma apenas cores claras dificeis de serem lidas são alteradas.
        """
        return 0.2126 * color.red + 0.7152 * color.green + 0.0722 * color.blue


class OpacityColorStrategy(ColorStartegy):
    """Estratégia para diminuir ou aumentar a opacidade da cor.

    OBS: retorna cores em RGBA.
    """

    def get_text_color(self, color_hex: str) -> str:
        """Faz nada, pois a opacidade deve ser 100%."""
        return color_hex

    def get_background_color(self, color_hex: str) -> str:
        """Diminui a opacidade da cor."""
        bg_color = ColorConverter.hex_to_colour(color_hex)

        # Convertendo para RGB com alpha (RGBA) com 15% de opacidade (0.15)
        rgba_color = (bg_color.rgb[0], bg_color.rgb[1], bg_color.rgb[2], 0.15)

        # Como o método colour_to_hex não suporta alpha,
        # vamos retornar no formato rgba()
        r = int(rgba_color[0] * 255)
        g = int(rgba_color[1] * 255)
        b = int(rgba_color[2] * 255)
        a = rgba_color[3]

        return f"rgba({r}, {g}, {b}, {a})"


class ColorManager:
    """Gerenciador de cores que aplica a estratégia definida."""

    def __init__(self, strategy: ColorStartegy) -> None:
        """Inicializa o gerenciador de cores com a estratégia definida."""
        self.strategy = strategy

    def get_text_color(self, background_hex: str) -> str:
        """Retorna a cor do texto com base no fundo."""
        return self.strategy.get_text_color(background_hex)

    def get_background_color(self, color_hex: str) -> str:
        """Retorna a cor de fundo com base na cor."""
        return self.strategy.get_background_color(color_hex)
