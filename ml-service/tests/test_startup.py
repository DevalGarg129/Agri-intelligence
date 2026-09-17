import os
import sys
import unittest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))


class StartupTest(unittest.TestCase):
    def test_app_imports_without_model_file(self):
        import app.main

        self.assertIsNotNone(app.main.app)


if __name__ == "__main__":
    unittest.main()
